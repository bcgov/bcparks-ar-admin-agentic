import { TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { KeycloakService } from '../services/keycloak.service';
import { LoggerService } from '../services/logger.service';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  const mockKeycloakService = jasmine.createSpyObj('KeycloakService', [
    'isAuthenticated',
    'isAuthorized',
    'isAllowed',
    'getIdpFromToken',
    'getUserIdentity',
    'login',
  ]);
  const mockRouter = jasmine.createSpyObj('Router', ['parseUrl']);
  const mockLoggerService = jasmine.createSpyObj('LoggerService', ['warn']);

  const stateWithUrl = (url: string) => ({ url } as any);

  const mockAuthenticatedAuthorizedUser = (allowedCapabilities: string[] = []) => {
    mockKeycloakService.isAuthenticated.and.returnValue(true);
    mockKeycloakService.isAuthorized.and.returnValue(true);
    mockKeycloakService.getIdpFromToken.and.returnValue('');
    mockKeycloakService.getUserIdentity.and.returnValue({ userId: 'user-1', email: 'user@example.com' });
    mockKeycloakService.isAllowed.and.callFake((capability: string) =>
      allowedCapabilities.includes(capability)
    );
  };

  beforeEach(() => {
    mockKeycloakService.getUserIdentity.and.returnValue({ userId: '', email: '' });
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: KeycloakService, useValue: mockKeycloakService },
        { provide: Router, useValue: mockRouter },
        { provide: LoggerService, useValue: mockLoggerService },
      ],
      imports: [RouterTestingModule],
    });
  });

  afterEach(() => {
    mockRouter.parseUrl.calls.reset();
    mockKeycloakService.isAuthenticated.calls.reset();
    mockKeycloakService.isAuthorized.calls.reset();
    mockKeycloakService.isAllowed.calls.reset();
    mockKeycloakService.getIdpFromToken.calls.reset();
    mockKeycloakService.getUserIdentity.calls.reset();
    mockKeycloakService.login.calls.reset();
    mockLoggerService.warn.calls.reset();
    mockRouter.parseUrl.and.stub();
    mockKeycloakService.isAuthenticated.and.stub();
    mockKeycloakService.isAuthorized.and.stub();
    mockKeycloakService.isAllowed.and.stub();
    mockKeycloakService.getIdpFromToken.and.stub();
    mockKeycloakService.getUserIdentity.and.returnValue({ userId: '', email: '' });
    mockKeycloakService.login.and.stub();
    mockLoggerService.warn.and.stub();
  });

  it('should be created', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should return false if the user is authenticated but has no roles', () => {
    mockKeycloakService.isAuthenticated.and.returnValue(true);
    mockKeycloakService.isAuthorized.and.returnValue(true);
    mockKeycloakService.isAllowed.and.returnValue(false);

    const guard = TestBed.get(AuthGuard);

    const result = guard.canActivate(null, {url: '/export-reports'});

    expect(result).toEqual(undefined);
  });

  it('should return redirect to login page if the user is not authenticated and sessionStorage does not contain an idp value', () => {
    const routerMock = TestBed.get(Router);
    routerMock.parseUrl.calls.reset();

    mockKeycloakService.isAuthenticated.and.returnValue(false);

    spyOn(window.sessionStorage, 'getItem').and.callFake(() => {
      return null;
    });

    const guard = TestBed.get(AuthGuard);
    guard.canActivate();

    expect(routerMock.parseUrl).toHaveBeenCalledWith('/login');
  });

  it('should return redirect to login page if the user is not authenticated and sessionStorage contains an idp value', () => {
    const routerMock = TestBed.get(Router);
    routerMock.parseUrl.calls.reset();

    mockKeycloakService.isAuthenticated.and.returnValue(false);

    spyOn(window.sessionStorage, 'getItem').and.callFake(() => {
      return 'idir';
    });

    const guard = TestBed.get(AuthGuard);
    guard.canActivate();

    expect(mockKeycloakService.login).toHaveBeenCalled();
  });

  it('should return redirect to unauthorized page if the user is not authorized', () => {
    const routerMock = TestBed.get(Router);
    routerMock.parseUrl.calls.reset();

    mockKeycloakService.isAuthenticated.and.returnValue(true);
    mockKeycloakService.isAuthorized.and.returnValue(false);

    const guard = TestBed.get(AuthGuard);
    guard.canActivate();

    expect(routerMock.parseUrl).toHaveBeenCalledWith('/unauthorized');
  });

  it('should log a security audit event when the user is not authorized', () => {
    // @R-03.1
    mockKeycloakService.isAuthenticated.and.returnValue(true);
    mockKeycloakService.isAuthorized.and.returnValue(false);
    mockKeycloakService.getUserIdentity.and.returnValue({ userId: 'user-1', email: 'user@example.com' });

    const guard = TestBed.get(AuthGuard);
    guard.canActivate(null, stateWithUrl('/lock-records'));

    expect(mockLoggerService.warn).toHaveBeenCalledTimes(1);
    const logEntry = mockLoggerService.warn.calls.mostRecent().args[0];
    expect(logEntry.eventType).toBe('authz_denied');
    expect(logEntry.userId).toBe('user-1');
    expect(logEntry.email).toBe('user@example.com');
    expect(logEntry.requestedUrl).toBe('/lock-records');
    expect(logEntry.outcome).toBe('no_roles');
    expect(typeof logEntry.timestamp).toBe('string');
    // Ensure no raw token/secret is leaked in the log entry.
    expect(JSON.stringify(logEntry)).not.toContain('token');
  });

  it('should not throw and should still log when route state is undefined on unauthorized redirect', () => {
    mockKeycloakService.isAuthenticated.and.returnValue(true);
    mockKeycloakService.isAuthorized.and.returnValue(false);

    const guard = TestBed.get(AuthGuard);

    expect(() => guard.canActivate()).not.toThrow();
    expect(mockLoggerService.warn).toHaveBeenCalledTimes(1);
    expect(mockLoggerService.warn.calls.mostRecent().args[0].requestedUrl).toBe('');
  });

  it('should log a security audit event when a route-specific capability check fails', () => {
    // @R-03.2 / @R-03.3 (query string is stripped before matching, url still logged)
    const redirect = {} as any;
    mockRouter.parseUrl.and.returnValue(redirect);
    mockAuthenticatedAuthorizedUser();

    const guard = TestBed.get(AuthGuard);
    guard.canActivate(null, stateWithUrl('/manage-subareas'));

    expect(mockLoggerService.warn).toHaveBeenCalledTimes(1);
    const logEntry = mockLoggerService.warn.calls.mostRecent().args[0];
    expect(logEntry.eventType).toBe('authz_denied');
    expect(logEntry.requestedUrl).toBe('/manage-subareas');
    expect(logEntry.outcome).toBe('not_allowed:manage-subareas');
  });

  it('should not log a security audit event when the user is allowed to access the route', () => {
    // @R-03.4
    mockAuthenticatedAuthorizedUser(['lock-records']);

    const guard = TestBed.get(AuthGuard);
    guard.canActivate(null, stateWithUrl('/lock-records?fiscal=2024'));

    expect(mockLoggerService.warn).not.toHaveBeenCalled();
  });

  it('should redirect non-admin from lock-records when query string is present', () => {
    const redirect = {} as any;
    mockRouter.parseUrl.and.returnValue(redirect);
    mockAuthenticatedAuthorizedUser();

    const guard = TestBed.get(AuthGuard);
    const result = guard.canActivate(null, stateWithUrl('/lock-records?x=1'));

    expect(result).toBe(redirect);
    expect(mockRouter.parseUrl).toHaveBeenCalledWith('/');
    // @R-03.3
    expect(mockLoggerService.warn).toHaveBeenCalledTimes(1);
    expect(mockLoggerService.warn.calls.mostRecent().args[0].requestedUrl).toBe('/lock-records?x=1');
  });

  it('should redirect non-admin from manage-subareas when query string is present', () => {
    const redirect = {} as any;
    mockRouter.parseUrl.and.returnValue(redirect);
    mockAuthenticatedAuthorizedUser();

    const guard = TestBed.get(AuthGuard);
    const result = guard.canActivate(null, stateWithUrl('/manage-subareas?foo=bar'));

    expect(result).toBe(redirect);
    expect(mockRouter.parseUrl).toHaveBeenCalledWith('/');
  });

  it('should redirect non-admin from export-reports when query string is present', () => {
    const redirect = {} as any;
    mockRouter.parseUrl.and.returnValue(redirect);
    mockAuthenticatedAuthorizedUser();

    const guard = TestBed.get(AuthGuard);
    const result = guard.canActivate(null, stateWithUrl('/export-reports?download=1'));

    expect(result).toBe(redirect);
    expect(mockRouter.parseUrl).toHaveBeenCalledWith('/');
  });

  it('should log a security audit event when denied review-data', () => {
    const redirect = {} as any;
    mockRouter.parseUrl.and.returnValue(redirect);
    mockAuthenticatedAuthorizedUser();

    const guard = TestBed.get(AuthGuard);
    const result = guard.canActivate(null, stateWithUrl('/review-data'));

    expect(result).toBe(redirect);
    expect(mockRouter.parseUrl).toHaveBeenCalledWith('/');
    expect(mockLoggerService.warn).toHaveBeenCalledTimes(1);
    expect(mockLoggerService.warn.calls.mostRecent().args[0].outcome).toBe('not_allowed:review-data');
  });

  it('should allow admin to access lock-records when query string is present', () => {
    mockAuthenticatedAuthorizedUser(['lock-records']);

    const guard = TestBed.get(AuthGuard);
    const result = guard.canActivate(null, stateWithUrl('/lock-records?fiscal=2024'));

    expect(result).toBe(true);
    expect(mockRouter.parseUrl).not.toHaveBeenCalledWith('/');
  });

  it('should still redirect non-admin from lock-records without query string', () => {
    const redirect = {} as any;
    mockRouter.parseUrl.and.returnValue(redirect);
    mockAuthenticatedAuthorizedUser();

    const guard = TestBed.get(AuthGuard);
    const result = guard.canActivate(null, stateWithUrl('/lock-records'));

    expect(result).toBe(redirect);
    expect(mockRouter.parseUrl).toHaveBeenCalledWith('/');
  });
});
