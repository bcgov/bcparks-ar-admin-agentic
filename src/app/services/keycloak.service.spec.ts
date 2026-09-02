import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { KeycloakService } from './keycloak.service';
import { ConfigService } from './config.service';
import { LoggerService } from './logger.service';
import { ToastService } from './toast.service';
import { JwtUtil } from '../shared/utils/jwt-utils';

describe('KeycloakService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        KeycloakService,
        ConfigService,
        LoggerService,
        ToastService,
        HttpClient,
        HttpHandler,
      ],
    });
  });

  it('idp should be `idir` if the token has an idir_userid property', () => {
    spyOn(JwtUtil, 'decodeToken').and.callFake(() => {
      return {
        idir_userid: '12345',
      };
    });
    const keycloak = TestBed.get(KeycloakService);
    spyOn(keycloak, 'getToken').and.callFake(() => {
      return 'not-empty';
    });
    const idp = keycloak.getIdpFromToken();
    expect(idp).toEqual('idir');
  });

  it('idp should be `bceid` if the token has an bceid_userid property', () => {
    spyOn(JwtUtil, 'decodeToken').and.callFake(() => {
      return {
        bceid_userid: '12345',
      };
    });
    const keycloak = TestBed.get(KeycloakService);
    spyOn(keycloak, 'getToken').and.callFake(() => {
      return 'not-empty';
    });
    const idp = keycloak.getIdpFromToken();
    expect(idp).toEqual('bceid');
  });

  it('idp should be `bcsc` if the token does not match any known patterns', () => {
    spyOn(JwtUtil, 'decodeToken').and.callFake(() => {
      return {
        preferred_username: 'abc',
      };
    });
    const keycloak = TestBed.get(KeycloakService);
    spyOn(keycloak, 'getToken').and.callFake(() => {
      return 'not-empty';
    });
    const idp = keycloak.getIdpFromToken();
    expect(idp).toEqual('bcsc');
  });

  it('getUserIdentity should return empty userId/email when there is no token', () => {
    const keycloak = TestBed.get(KeycloakService);
    spyOn(keycloak, 'getToken').and.callFake(() => {
      return undefined;
    });
    expect(keycloak.getUserIdentity()).toEqual({ userId: '', email: '' });
  });

  it('getUserIdentity should return the sub and email claims from the token', () => {
    spyOn(JwtUtil, 'decodeToken').and.callFake(() => {
      return {
        sub: 'abc-123',
        email: 'person@example.com',
      };
    });
    const keycloak = TestBed.get(KeycloakService);
    spyOn(keycloak, 'getToken').and.callFake(() => {
      return 'not-empty';
    });
    expect(keycloak.getUserIdentity()).toEqual({
      userId: 'abc-123',
      email: 'person@example.com',
    });
  });

  it('getUserIdentity should not leak the raw token', () => {
    spyOn(JwtUtil, 'decodeToken').and.callFake(() => {
      return {
        sub: 'abc-123',
        email: 'person@example.com',
      };
    });
    const keycloak = TestBed.get(KeycloakService);
    spyOn(keycloak, 'getToken').and.callFake(() => {
      return 'super-secret-raw-token-value';
    });
    const identity = keycloak.getUserIdentity();
    expect(JSON.stringify(identity)).not.toContain('super-secret-raw-token-value');
  });

  describe('Keycloak lifecycle logging', () => {
    let keycloak: KeycloakService;
    let loggerService: jasmine.SpyObj<LoggerService>;
    let keycloakAuth: any;

    beforeEach(() => {
      loggerService = jasmine.createSpyObj('LoggerService', [
        'debug',
        'error',
        'log',
        'warn',
      ]);

      const configService = {
        config: {
          KEYCLOAK_ENABLED: true,
          KEYCLOAK_URL: 'https://keycloak.example.com',
          KEYCLOAK_REALM: 'bcparks-service-transformation',
          KEYCLOAK_CLIENT_ID: 'attendance-and-revenue',
        },
      };

      keycloakAuth = {
        init: jasmine.createSpy('init').and.returnValue(Promise.resolve(true)),
        token: 'raw-access-token-value',
        updateToken: jasmine.createSpy('updateToken'),
      };

      (globalThis as any).Keycloak = function () {
        return keycloakAuth;
      };

      keycloak = new KeycloakService(
        configService as any,
        loggerService,
        jasmine.createSpyObj('ToastService', ['addMessage']),
      );
    });

    afterEach(() => {
      delete (globalThis as any).Keycloak;
    });

    async function initWithDecodedIdentity() {
      spyOn(JwtUtil, 'decodeToken').and.returnValue({
        sub: 'user-123',
        email: 'person@example.com',
      });

      await keycloak.init();
      loggerService.debug.calls.reset();
      loggerService.error.calls.reset();
      loggerService.log.calls.reset();
      loggerService.warn.calls.reset();
    }

    it('logs auth errors above debug with a non-secret identity hint', async () => {
      await initWithDecodedIdentity();

      keycloakAuth.onAuthError();

      expect(loggerService.error).toHaveBeenCalledTimes(1);
      expect(loggerService.debug).not.toHaveBeenCalled();
      const message = loggerService.error.calls.mostRecent().args[0];
      expect(message).toContain('onAuthError');
      expect(message).toContain('userId=user-123');
      expect(message).toContain('email=person@example.com');
      expect(message).not.toContain('raw-access-token-value');
    });

    it('logs refresh errors above debug without leaking the token', async () => {
      await initWithDecodedIdentity();

      keycloakAuth.onAuthRefreshError();

      expect(loggerService.error).toHaveBeenCalledTimes(1);
      expect(loggerService.debug).not.toHaveBeenCalled();
      const message = loggerService.error.calls.mostRecent().args[0];
      expect(message).toContain('onAuthRefreshError');
      expect(message).toContain('userId=user-123');
      expect(message).toContain('email=person@example.com');
      expect(message).not.toContain('raw-access-token-value');
    });

    it('logs logout above debug without leaking the token', async () => {
      await initWithDecodedIdentity();

      keycloakAuth.onAuthLogout();

      expect(loggerService.warn).toHaveBeenCalledTimes(1);
      expect(loggerService.debug).not.toHaveBeenCalled();
      const message = loggerService.warn.calls.mostRecent().args[0];
      expect(message).toContain('onAuthLogout');
      expect(message).toContain('userId=user-123');
      expect(message).toContain('email=person@example.com');
      expect(message).not.toContain('raw-access-token-value');
    });

    it('keeps success callbacks at debug level', async () => {
      await initWithDecodedIdentity();

      keycloakAuth.onAuthSuccess();
      keycloakAuth.onAuthRefreshSuccess();

      expect(loggerService.debug).toHaveBeenCalledWith('onAuthSuccess');
      expect(loggerService.debug).toHaveBeenCalledWith('onAuthRefreshSuccess');
      expect(loggerService.warn).not.toHaveBeenCalled();
      expect(loggerService.error).not.toHaveBeenCalled();
    });
  });
});
