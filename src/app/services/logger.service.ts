import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/services/config.service';

export enum LogLevel {
  All = 0,
  Debug = 1,
  Info = 2,
  Warn = 3,
  Error = 4,
  Fatal = 5,
  Off = 6
}

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  // Safe default: if env.js omits logLevel, fall back to Warn (not Off) so
  // security-relevant warnings/errors are never silently dropped.
  level: LogLevel = LogLevel.Warn;
  logWithDate = true;
  private hasWarnedMissingLogLevel = false;

  // For future enhancement, constructor could be updated to take a config struct
  // and move providedIn to a forRoot call.
  constructor(private configService: ConfigService) {
    if (this.configService.logLevel === undefined) {
      this.warnMissingLogLevel();
    }
  }

  debug(msg: any) {
    this.log(msg, LogLevel.Debug);
  }

  info(msg: any) {
    this.log(msg, LogLevel.Info);
  }

  warn(msg: any) {
    this.log(msg, LogLevel.Warn);
  }

  error(msg: any) {
    this.log(msg, LogLevel.Error);
  }

  fatal(msg: any) {
    this.log(msg, LogLevel.Fatal);
  }

  log(msg: any, level: LogLevel = LogLevel.Debug) {
    if (this.shouldLog(level)) {
      const logEntry = this.buildLogEntry(msg, level);

      console.log(this.entryToJson(logEntry));
    }
  }

  // Structured log entry per RA finding LOG-006. userId/sessionId/correlationId
  // are placeholders (null) until wired to Keycloak/request context (LOG-007).
  private buildLogEntry(msg: any, level: LogLevel) {
    return {
      level: LogLevel[level],
      timestamp: new Date().toISOString(),
      userId: null,
      sessionId: null,
      correlationId: null,
      message: msg,
      context: null,
      // @R-19.2: warnings and errors are security-relevant by default.
      securityEvent: level >= LogLevel.Warn && level !== LogLevel.Off
    };
  }

  private entryToJson(logEntry): string {
    return JSON.stringify(logEntry);
  }

  private shouldLog(level: LogLevel): boolean {
    let configLevel = this.configService.logLevel;
    if (configLevel === undefined) {
      this.warnMissingLogLevel();
      configLevel = LogLevel.Warn;
    }

    if ((level >= configLevel && level !== LogLevel.Off) || configLevel === LogLevel.All) {
      return true;
    }

    return false;
  }

  private warnMissingLogLevel() {
    if (!this.hasWarnedMissingLogLevel) {
      this.hasWarnedMissingLogLevel = true;
      // eslint-disable-next-line no-console
      console.warn(
        'LoggerService: logLevel is not configured in env.js; defaulting to LogLevel.Warn. ' +
        'Set logLevel explicitly (see env.js.template) to enable debug logging.'
      );
    }
  }
}
