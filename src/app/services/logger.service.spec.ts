import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ConfigService } from './config.service';
import { LoggerService, LogLevel } from './logger.service';

describe('LoggerService', () => {
  let originalEnv: any;

  beforeEach(() => {
    originalEnv = window['__env'];

    TestBed.configureTestingModule({
      providers: [ ConfigService, HttpClient, HttpHandler ]
    });
  });

  afterEach(() => {
    window['__env'] = originalEnv;
  });

  it('should be created', () => {
    const loggerService = TestBed.inject(LoggerService);
    spyOn(LoggerService.prototype, "log").and.callThrough();

    expect(loggerService).toBeTruthy();
    loggerService.debug('Some Debug Message');
    expect(LoggerService.prototype.log).toHaveBeenCalledTimes(1);

    loggerService.info('Some Info Message');
    expect(LoggerService.prototype.log).toHaveBeenCalledTimes(2);

    loggerService.warn('Some Warn Message');
    expect(LoggerService.prototype.log).toHaveBeenCalledTimes(3);

    loggerService.fatal('Some Fatal Message');
    expect(LoggerService.prototype.log).toHaveBeenCalledTimes(4);
  });

  // @R-17.1: Missing logLevel defaults to Warn not Off
  it('should default to LogLevel.Warn (not Off) when window.__env has no logLevel property', () => {
    delete window['__env'];
    spyOn(console, 'warn');
    spyOn(console, 'log');

    const loggerService = TestBed.inject(LoggerService);

    loggerService.warn('Some Warn Message');
    expect(console.log).toHaveBeenCalled();

    (console.log as jasmine.Spy).calls.reset();
    loggerService.debug('Some Debug Message that should not be logged');
    expect(console.log).not.toHaveBeenCalled();

    expect(loggerService.level).not.toEqual(LogLevel.Off);
    expect(loggerService.level).toEqual(LogLevel.Warn);
  });

  // @R-17.2: Startup warns when logLevel is not configured
  it('should console.warn once, advising logLevel be set explicitly for debug, when unset', () => {
    delete window['__env'];
    const warnSpy = spyOn(console, 'warn');

    const loggerService = TestBed.inject(LoggerService);
    // Triggering additional log calls must not repeat the startup warning.
    loggerService.warn('Some Warn Message');
    loggerService.error('Some Error Message');

    expect(warnSpy).toHaveBeenCalledTimes(1);
    const message = warnSpy.calls.mostRecent().args[0];
    expect(message).toContain('logLevel');
    expect(message.toLowerCase()).toContain('debug');
  });

  // @R-19.1: Log entries are JSON objects with required fields
  it('should emit log entries as JSON objects with required fields', () => {
    const logSpy = spyOn(console, 'log');

    const loggerService = TestBed.inject(LoggerService);
    loggerService.warn('Some Warn Message');

    expect(logSpy).toHaveBeenCalled();
    const output = logSpy.calls.mostRecent().args[0];
    let parsed: any;
    expect(() => (parsed = JSON.parse(output))).not.toThrow();

    expect(parsed.level).toEqual('Warn');
    expect(parsed.timestamp).toBeDefined();
    expect(parsed.message).toEqual('Some Warn Message');
    expect(parsed).toEqual(jasmine.objectContaining({
      userId: null,
      sessionId: null,
      correlationId: null
    }));
  });

  // @R-19.2: Security events include securityEvent flag
  it('should set securityEvent true for warn and error, false for debug/info', () => {
    const logSpy = spyOn(console, 'log');

    const loggerService = TestBed.inject(LoggerService);

    loggerService.warn('Some Warn Message');
    let parsed = JSON.parse(logSpy.calls.mostRecent().args[0]);
    expect(parsed.securityEvent).toBe(true);

    loggerService.error('Some Error Message');
    parsed = JSON.parse(logSpy.calls.mostRecent().args[0]);
    expect(parsed.securityEvent).toBe(true);

    logSpy.calls.reset();
    window['__env'] = { ...window['__env'], logLevel: LogLevel.All };

    loggerService.debug('Some Debug Message');
    parsed = JSON.parse(logSpy.calls.mostRecent().args[0]);
    expect(parsed.securityEvent).toBe(false);

    loggerService.info('Some Info Message');
    parsed = JSON.parse(logSpy.calls.mostRecent().args[0]);
    expect(parsed.securityEvent).toBe(false);
  });
});
