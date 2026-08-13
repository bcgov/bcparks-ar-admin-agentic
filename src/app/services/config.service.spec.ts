import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ConfigService } from './config.service';
import { LoggerService } from './logger.service';

describe('ConfigService', () => {
  let service: ConfigService;

  let mockHttpClient = {
    get: (location) => {
      return of({
        debug: true,
        configurationEndpoint: true
      })
    }
  }

  let mockHttpClientLogLevelZero = {
    get: (location) => {
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
    const consoleLog = spyOn(console, 'log');

    await service.init();

    expect(consoleError).toHaveBeenCalledTimes(0);
    expect(consoleLog).not.toHaveBeenCalledWith('Configuration:', jasmine.anything());
  });

  it('should be created and have log level 0', async () => {
    window['__env'] = {
      debug: true,
      configEndpoint: true,
      logLevel: 0
    }
    TestBed.overrideProvider(HttpClient, { useValue: mockHttpClientLogLevelZero });
    service = TestBed.inject(ConfigService);

    expect(service).toBeTruthy();
    await service.init();
    expect(service.logLevel).toEqual(0);
  });

  it('should be created and throw', async () => {
    window['__env'] = {
      debug: true,
      configEndpoint: true,
      logLevel: 3
    }
    TestBed.overrideProvider(HttpClient, { useValue: mockHttpClientFailedThrow });
    service = TestBed.inject(ConfigService);

    const consoleError = spyOn(console, 'error');

    expect(service).toBeTruthy();
    expect(service.config).toEqual({});

    await service.init();

    expect(consoleError).toHaveBeenCalled();
  });

  it('should not dump full configuration when logLevel is not 0', async () => {
    window['__env'] = {
      debug: true,
      configEndpoint: false,
      logLevel: 3
    };
    service = TestBed.inject(ConfigService);
    const consoleLog = spyOn(console, 'log');

    await service.init();

    expect(consoleLog).not.toHaveBeenCalledWith('Configuration:', jasmine.anything());
  });
});
