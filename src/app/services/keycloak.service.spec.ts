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
});
