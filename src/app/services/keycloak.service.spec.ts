import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { KeycloakService } from './keycloak.service';
import { ConfigService } from './config.service';
import { LoggerService } from './logger.service';
import { ToastService } from './toast.service';
import { JwtUtil } from '../shared/utils/jwt-utils';
import { Constants } from '../shared/utils/constants';

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

  it('idp should be `idir` if tokenParsed has an idir_userid property', () => {
    const decodeTokenSpy = spyOn(JwtUtil, 'decodeToken');
    const keycloak = TestBed.get(KeycloakService);
    spyOn(keycloak, 'getToken').and.callFake(() => {
      return 'not-empty';
    });
    spyOn(keycloak, 'getTokenClaims').and.callFake(() => {
      return {
        idir_userid: '12345',
      };
    });
    const idp = keycloak.getIdpFromToken();
    expect(idp).toEqual('idir');
    expect(decodeTokenSpy).not.toHaveBeenCalled();
  });

  it('idp should be `bceid` if tokenParsed has an bceid_userid property', () => {
    const decodeTokenSpy = spyOn(JwtUtil, 'decodeToken');
    const keycloak = TestBed.get(KeycloakService);
    spyOn(keycloak, 'getToken').and.callFake(() => {
      return 'not-empty';
    });
    spyOn(keycloak, 'getTokenClaims').and.callFake(() => {
      return {
        bceid_userid: '12345',
      };
    });
    const idp = keycloak.getIdpFromToken();
    expect(idp).toEqual('bceid');
    expect(decodeTokenSpy).not.toHaveBeenCalled();
  });

  it('idp should be `bcsc` if tokenParsed does not match any known patterns', () => {
    const decodeTokenSpy = spyOn(JwtUtil, 'decodeToken');
    const keycloak = TestBed.get(KeycloakService);
    spyOn(keycloak, 'getToken').and.callFake(() => {
      return 'not-empty';
    });
    spyOn(keycloak, 'getTokenClaims').and.callFake(() => {
      return {
        preferred_username: 'abc',
      };
    });
    const idp = keycloak.getIdpFromToken();
    expect(idp).toEqual('bcsc');
    expect(decodeTokenSpy).not.toHaveBeenCalled();
  });

  it('getUserIdentity should return empty userId/email when there is no token', () => {
    const keycloak = TestBed.get(KeycloakService);
    spyOn(keycloak, 'getToken').and.callFake(() => {
      return undefined;
    });
    expect(keycloak.getUserIdentity()).toEqual({ userId: '', email: '' });
  });

  it('getUserIdentity should return the sub and email claims from tokenParsed', () => {
    const decodeTokenSpy = spyOn(JwtUtil, 'decodeToken');
    const keycloak = TestBed.get(KeycloakService);
    spyOn(keycloak, 'getToken').and.callFake(() => {
      return 'not-empty';
    });
    spyOn(keycloak, 'getTokenClaims').and.callFake(() => {
      return {
        sub: 'abc-123',
        email: 'person@example.com',
      };
    });
    expect(keycloak.getUserIdentity()).toEqual({
      userId: 'abc-123',
      email: 'person@example.com',
    });
    expect(decodeTokenSpy).not.toHaveBeenCalled();
  });

  it('getUserIdentity should not leak the raw token', () => {
    const decodeTokenSpy = spyOn(JwtUtil, 'decodeToken');
    const keycloak = TestBed.get(KeycloakService);
    spyOn(keycloak, 'getToken').and.callFake(() => {
      return 'super-secret-raw-token-value';
    });
    spyOn(keycloak, 'getTokenClaims').and.callFake(() => {
      return {
        sub: 'abc-123',
        email: 'person@example.com',
      };
    });
    const identity = keycloak.getUserIdentity();
    expect(JSON.stringify(identity)).not.toContain('super-secret-raw-token-value');
    expect(decodeTokenSpy).not.toHaveBeenCalled();
  });

  it('getTokenClaims returns the Keycloak adapter tokenParsed for a real session', () => {
    const keycloak = TestBed.get(KeycloakService);
    (keycloak as any).keycloakAuth = {
      tokenParsed: { sub: 'user-1', resource_access: {} },
    };
    expect(keycloak.getTokenClaims()).toEqual({
      sub: 'user-1',
      resource_access: {},
    });
  });

  it('isAdmin reads the sysadmin role from tokenParsed, not JwtUtil.decodeToken', () => {
    const decodeTokenSpy = spyOn(JwtUtil, 'decodeToken');
    const keycloak = TestBed.get(KeycloakService);
    spyOn(keycloak, 'getToken').and.returnValue('not-empty');
    spyOn(keycloak, 'getTokenClaims').and.returnValue({
      resource_access: {
        'attendance-and-revenue': { roles: ['sysadmin'] },
      },
    });
    expect(keycloak.isAdmin()).toEqual(true);
    expect(decodeTokenSpy).not.toHaveBeenCalled();
  });

  it('isAdmin uses Constants.ApplicationRoles.ADMIN rather than a hardcoded role string', () => {
    const keycloak = TestBed.get(KeycloakService);
    spyOn(keycloak, 'getToken').and.returnValue('not-empty');
    spyOn(keycloak, 'getTokenClaims').and.returnValue({
      resource_access: {
        'attendance-and-revenue': { roles: [Constants.ApplicationRoles.ADMIN] },
      },
    });
    expect(keycloak.isAdmin()).toEqual(true);
  });

  it('isAdmin returns false when the role does not match Constants.ApplicationRoles.ADMIN', () => {
    const keycloak = TestBed.get(KeycloakService);
    spyOn(keycloak, 'getToken').and.returnValue('not-empty');
    spyOn(keycloak, 'getTokenClaims').and.returnValue({
      resource_access: {
        'attendance-and-revenue': { roles: ['not-the-admin-role'] },
      },
    });
    expect(keycloak.isAdmin()).toEqual(false);
  });

  it('isAuthorized reads roles from tokenParsed, not JwtUtil.decodeToken', () => {
    const decodeTokenSpy = spyOn(JwtUtil, 'decodeToken');
    const keycloak = TestBed.get(KeycloakService);
    spyOn(keycloak, 'getToken').and.returnValue('not-empty');
    spyOn(keycloak, 'getTokenClaims').and.returnValue({
      resource_access: {
        'attendance-and-revenue': { roles: ['user'] },
      },
    });
    expect(keycloak.isAuthorized()).toEqual(true);
    expect(decodeTokenSpy).not.toHaveBeenCalled();
  });

  it('getWelcomeMessage reads the name claim from tokenParsed, not JwtUtil.decodeToken', () => {
    const decodeTokenSpy = spyOn(JwtUtil, 'decodeToken');
    const keycloak = TestBed.get(KeycloakService);
    spyOn(keycloak, 'getToken').and.returnValue('not-empty');
    spyOn(keycloak, 'getTokenClaims').and.returnValue({ name: 'Jane Doe' });
    expect(keycloak.getWelcomeMessage()).toEqual('Jane Doe');
    expect(decodeTokenSpy).not.toHaveBeenCalled();
  });

  describe('isAllowed', () => {
    // @AUTHZ-002 export-reports and review-data must be enforced as admin-only,
    // matching the guard blocks in AuthGuard.canActivate().
    ['lock-records', 'manage-subareas', 'export-reports', 'review-data'].forEach(
      (route) => {
        it(`returns false for '${route}' when the user is not an admin`, () => {
          const keycloak = TestBed.get(KeycloakService);
          spyOn(keycloak, 'getToken').and.returnValue('not-empty');
          spyOn(keycloak, 'getTokenClaims').and.returnValue({
            resource_access: {
              'attendance-and-revenue': { roles: ['user'] },
            },
          });
          expect(keycloak.isAllowed(route)).toEqual(false);
        });

        it(`returns true for '${route}' when the user is an admin`, () => {
          const keycloak = TestBed.get(KeycloakService);
          spyOn(keycloak, 'getToken').and.returnValue('not-empty');
          spyOn(keycloak, 'getTokenClaims').and.returnValue({
            resource_access: {
              'attendance-and-revenue': { roles: ['sysadmin'] },
            },
          });
          expect(keycloak.isAllowed(route)).toEqual(true);
        });
      }
    );

    it("returns true for routes that are not admin-only, regardless of role", () => {
      const keycloak = TestBed.get(KeycloakService);
      spyOn(keycloak, 'getToken').and.returnValue('not-empty');
      spyOn(keycloak, 'getTokenClaims').and.returnValue({
        resource_access: {
          'attendance-and-revenue': { roles: ['user'] },
        },
      });
      expect(keycloak.isAllowed('some-other-route')).toEqual(true);
    });
  });

  it('logout delegates to the Keycloak adapter with an app base redirect URI', () => {
    const keycloak = TestBed.get(KeycloakService);
    const keycloakAuth = {
      logout: jasmine.createSpy('logout'),
    };
    (keycloak as any).keycloakAuth = keycloakAuth;

    keycloak.logout();

    expect(keycloakAuth.logout).toHaveBeenCalledOnceWith({
      redirectUri: new URL('/', window.location.origin).toString(),
    });
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
      keycloakAuth.tokenParsed = {
        sub: 'user-123',
        email: 'person@example.com',
      };

      await keycloak.init();
      loggerService.debug.calls.reset();
      loggerService.error.calls.reset();
      loggerService.log.calls.reset();
      loggerService.warn.calls.reset();
    }

    it('initializes Keycloak with PKCE S256', async () => {
      await keycloak.init();

      expect(keycloakAuth.init).toHaveBeenCalledWith({ pkceMethod: 'S256' });
    });

    // @AUTH-005 @R-26.2 the configured client id must be passed through as-is.
    it('creates the Keycloak adapter with the configured KEYCLOAK_CLIENT_ID', async () => {
      const capturedConfigs: any[] = [];
      (globalThis as any).Keycloak = function (config: any) {
        capturedConfigs.push(config);
        return keycloakAuth;
      };

      await keycloak.init();

      expect(capturedConfigs.length).toEqual(1);
      expect(capturedConfigs[0].clientId).toEqual('attendance-and-revenue');
    });

    // @AUTH-005 a missing KEYCLOAK_CLIENT_ID must never silently fall back
    // to another application's hardcoded OAuth client ID.
    it('fails init and does not fall back to a hardcoded client ID when KEYCLOAK_CLIENT_ID is missing', async () => {
      const toastService = jasmine.createSpyObj('ToastService', [
        'addMessage',
      ]);
      const configServiceNoClientId = {
        config: {
          KEYCLOAK_ENABLED: true,
          KEYCLOAK_URL: 'https://keycloak.example.com',
          KEYCLOAK_REALM: 'bcparks-service-transformation',
        },
      };

      const keycloakNoClientId = new KeycloakService(
        configServiceNoClientId as any,
        loggerService,
        toastService,
      );

      await expectAsync(keycloakNoClientId.init()).toBeRejected();

      expect(keycloakAuth.init).not.toHaveBeenCalled();
      expect(toastService.addMessage).toHaveBeenCalled();
      const message = loggerService.error.calls.mostRecent().args[0];
      expect(message).toContain('KEYCLOAK_CLIENT_ID');
      expect(message).not.toContain('nrpti-admin');
    });

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

  // @AUTH-004 a background refresh failure must force re-authentication
  // instead of leaving the user in an authenticated-looking state.
  describe('token expiry handling', () => {
    let keycloak: KeycloakService;
    let loggerService: jasmine.SpyObj<LoggerService>;
    let keycloakAuth: any;
    let redirectToLoginSpy: jasmine.Spy;

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
        tokenParsed: { sub: 'user-123', email: 'person@example.com' },
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

      redirectToLoginSpy = spyOn<any>(keycloak, 'redirectToLogin');
    });

    afterEach(() => {
      delete (globalThis as any).Keycloak;
    });

    it('redirects to login when the background token refresh fails', async () => {
      keycloakAuth.updateToken.and.returnValue(
        Promise.reject('refresh token expired'),
      );

      await keycloak.init();
      await keycloakAuth.onTokenExpired();

      expect(redirectToLoginSpy).toHaveBeenCalledTimes(1);
      const message = loggerService.error.calls.mostRecent().args[0];
      expect(message).toContain('KC refresh error');
      expect(message).not.toContain('raw-access-token-value');
    });

    it('does not redirect when the background token refresh succeeds', async () => {
      keycloakAuth.updateToken.and.returnValue(Promise.resolve(true));

      await keycloak.init();
      await keycloakAuth.onTokenExpired();

      expect(redirectToLoginSpy).not.toHaveBeenCalled();
    });

    it('builds an absolute login URL relative to the app base href', () => {
      expect((keycloak as any).getLoginUrl('/dayuse')).toEqual(
        new URL('/login', window.location.origin).toString(),
      );
    });

    it('does not redirect when the user is already on the login page', () => {
      expect((keycloak as any).getLoginUrl('/login')).toBeNull();
    });
  });
});
