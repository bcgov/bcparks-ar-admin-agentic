import { ErrorHandler, Injectable } from '@angular/core';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class AppErrorHandler implements ErrorHandler {
  constructor(private logger: LoggerService) {}

  handleError(error: any): void {
    try {
      this.logger.error(error);
    } catch {
      // Prevent unhandled exceptions inside the error handler from breaking execution
    }
  }
}
