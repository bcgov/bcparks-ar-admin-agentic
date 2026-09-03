import { ErrorHandler } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AppErrorHandler } from './app-error-handler.service';
import { LoggerService } from './logger.service';
import { AppModule } from '../app.module';

describe('AppErrorHandler', () => {
  let loggerServiceSpy: jasmine.SpyObj<LoggerService>;

  beforeEach(() => {
    loggerServiceSpy = jasmine.createSpyObj('LoggerService', ['error']);

    TestBed.configureTestingModule({
      providers: [
        AppErrorHandler,
        { provide: LoggerService, useValue: loggerServiceSpy },
      ],
    });
  });

  it('should be created', () => {
    const handler = TestBed.inject(AppErrorHandler);
    expect(handler).toBeTruthy();
  });

  // @R-37.2: Unhandled errors are forwarded to LoggerService
  it('should forward unhandled errors to LoggerService without rethrowing', () => {
    const handler = TestBed.inject(AppErrorHandler);
    const error = new Error('Test uncaught error');

    expect(() => handler.handleError(error)).not.toThrow();
    expect(loggerServiceSpy.error).toHaveBeenCalledWith(error);
  });

  it('should handle errors gracefully even if LoggerService throws', () => {
    loggerServiceSpy.error.and.throwError('Logger failure');
    const handler = TestBed.inject(AppErrorHandler);
    const error = new Error('Test uncaught error');

    expect(() => handler.handleError(error)).not.toThrow();
  });
});

describe('AppModule ErrorHandler Provider', () => {
  let originalEnv: any;

  beforeEach(() => {
    originalEnv = window['__env'];
    window['__env'] = {
      API_LOCATION: 'http://localhost',
      API_PATH: '/api',
      KEYCLOAK_REALM: 'test',
      KEYCLOAK_CLIENT_ID: 'test',
      KEYCLOAK_URL: 'http://localhost',
    };
  });

  afterEach(() => {
    window['__env'] = originalEnv;
  });

  // @R-37.1: Custom ErrorHandler is registered in AppModule
  it('should register AppErrorHandler as the ErrorHandler provider in AppModule metadata', () => {
    const providers = (AppModule as any)?.ɵinj?.providers || [];
    const provider = providers.find((p: any) => p && p.provide === ErrorHandler);

    expect(provider).toBeTruthy();
    expect(provider.useClass).toBe(AppErrorHandler);
  });

  it('should bind ErrorHandler to AppErrorHandler when injected from AppModule context', () => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    });

    const errorHandler = TestBed.inject(ErrorHandler);
    expect(errorHandler instanceof AppErrorHandler).toBeTrue();
  });
});
