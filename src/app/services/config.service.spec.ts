import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ConfigService } from './config.service';
import { LoggerService } from './logger.service';

describe('ConfigService', () => {
  let service: ConfigService;

  let mockHttpClient = {
    get: (location) => {
      console.log("Getting configuration:", location);
      return of({
        debug: true,
        configurationEndpoint: true
      })
    }
  }

  let mockHttpClientLogLevelZero = {
    get: () => {
      return of({
        debug: true,
        configurationEndpoint: true,
        logLevel: 0
      })
    }
  }

  let mockHttpClientFailedThrow = {
    get: (location) => {
      throw 'woops'
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient, useValue: mockHttpClient
        },
        LoggerService,
        ConfigService,
        HttpHandler
      ],
    });
  });

  it('should be created', async () => {
    window['__env'] = {
      debug: true,
      configEndpoint: true,
      logLevel: 0
    }
    service = TestBed.inject(ConfigService);
    expect(service).toBeTruthy();
    expect(service.config).toEqual({});
  });

  it('should be created and log level 0 without throw', async () => {
    window['__env'] = {
      debug: true,
      configEndpoint: true
    }
    TestBed.overrideProvider(HttpClient, { useValue: mockHttpClientLogLevelZero });
    service = TestBed.inject(ConfigService);
    expect(service).toBeTruthy();

    expect(service.config).toEqual({});
    expect(service.logLevel).toEqual(undefined);
    const consoleError = spyOn(console, 'error');

    await service.init();

    expect(consoleError).toHaveBeenCalledTimes(0);
  });

  it('should be created and have log level 0', async () => {
    window['__env'] = {
      debug: true,
      configEndpoint: true,
      logLevel: 0
    }
    TestBed.overrideProvider(HttpClient, { useValue: mockHttpClientLogLevelZero });
    service = TestBed.inject(ConfigService);

    const consoleLog = spyOn(console, 'log');

    expect(service).toBeTruthy();
    await service.init();
    expect(service.logLevel).toEqual(0);
    expect(consoleLog).not.toHaveBeenCalled();
  });

  it('should not log the front-end env configuration when log level is 0', async () => {
    window['__env'] = {
      API_LOCATION: 'https://api.example.test',
      API_PUBLIC_PATH: '/api',
      KEYCLOAK_URL: 'https://keycloak.example.test',
      KEYCLOAK_REALM: 'example-realm',
      KEYCLOAK_CLIENT_ID: 'example-client',
      configEndpoint: false,
      logLevel: 0
    }
    service = TestBed.inject(ConfigService);

    const consoleLog = spyOn(console, 'log');

    await service.init();

    expect(consoleLog).not.toHaveBeenCalled();
  });

  it('should be created and throw', async () => {
    window['__env'] = {
      debug: true,
      configEndpoint: true,
      logLevel: 3
    }
    TestBed.overrideProvider(HttpClient, { useValue: mockHttpClientFailedThrow });
    service = TestBed.inject(ConfigService);

    // Errors caught during config init are routed through LoggerService,
    // which logs via console.log (not console.error) with a sanitised
    // message rather than the raw error object.
    const consoleLog = spyOn(console, 'log');

    expect(service).toBeTruthy();
    expect(service.config).toEqual({});

    await service.init();

    expect(consoleLog).toHaveBeenCalled();
    const loggedMessage = consoleLog.calls.mostRecent().args[0];
    expect(loggedMessage).toContain('Error getting remote configuration');
    expect(loggedMessage).toContain('woops');
  });
});
