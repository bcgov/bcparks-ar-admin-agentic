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

  // AUTH-001: PKCE S256 init
  describe('init() — PKCE (AUTH-001)', () => {
    it('should call Keycloak init with pkceMethod S256 for real auth', async () => {
      const keycloak = TestBed.get(KeycloakService);
      const configService = TestBed.get(ConfigService);

      configService.config = {
        KEYCLOAK_ENABLED: true,
        KEYCLOAK_URL: 'https://example.com/auth',
        KEYCLOAK_REALM: 'test-realm',
        KEYCLOAK_CLIENT_ID: 'test-client',
        ENVIRONMENT: 'production',
      };

      let capturedInitOptions: any;
      const mockKeycloak = {
        onAuthSuccess: null,
        onAuthError: null,
        onAuthRefreshSuccess: null,
        onAuthRefreshError: null,
        onAuthLogout: null,
        onTokenExpired: null,
        init: jasmine.createSpy('init').and.callFake((opts: any) => {
          capturedInitOptions = opts;
          return Promise.resolve(true);
        }),
      };

      (window as any).Keycloak = jasmine.createSpy('Keycloak').and.returnValue(mockKeycloak);

      await keycloak.init();

      expect(mockKeycloak.init).toHaveBeenCalledWith(
        jasmine.objectContaining({ pkceMethod: 'S256' })
      );
    });

    it('should not call Keycloak init when local mock auth is active', async () => {
      const keycloak = TestBed.get(KeycloakService);
      const configService = TestBed.get(ConfigService);

      configService.config = {
        KEYCLOAK_ENABLED: true,
        KEYCLOAK_URL: 'https://example.com/auth',
        KEYCLOAK_REALM: 'test-realm',
        KEYCLOAK_CLIENT_ID: 'test-client',
        ENVIRONMENT: 'local',
        LOCAL_MOCK_AUTH: true,
      };

      const mockKcInit = jasmine.createSpy('init').and.returnValue(Promise.resolve(true));
      (window as any).Keycloak = jasmine.createSpy('Keycloak').and.returnValue({ init: mockKcInit });

      await keycloak.init();

      expect(mockKcInit).not.toHaveBeenCalled();
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
});
