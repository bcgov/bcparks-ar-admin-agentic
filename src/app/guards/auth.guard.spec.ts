import { TestBed, inject } from '@angular/core/testing';
import { Router, RouterStateSnapshot } from '@angular/router';
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
    'getUsername',
    'login',
  ]);
  const mockRouter = jasmine.createSpyObj('Router', ['parseUrl']);
  const mockLoggerService = jasmine.createSpyObj('LoggerService', ['warn']);

  beforeEach(() => {
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
    mockRouter.parseUrl.and.stub();
    mockKeycloakService.isAuthenticated.and.stub();
    mockKeycloakService.isAuthorized.and.stub();
    mockKeycloakService.isAllowed.and.stub();
    mockKeycloakService.getIdpFromToken.and.stub();
    mockKeycloakService.getUsername.and.stub();
    mockKeycloakService.login.calls.reset();
    mockLoggerService.warn.calls.reset();
  });

  function createState(url: string) {
    return { url } as RouterStateSnapshot;
  }

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
    mockKeycloakService.getUsername.and.returnValue('');

    const guard = TestBed.get(AuthGuard);
    guard.canActivate();

    expect(routerMock.parseUrl).toHaveBeenCalledWith('/unauthorized');
  });

  it('should log a warning when the user is not authorized', () => {
    mockKeycloakService.isAuthenticated.and.returnValue(true);
    mockKeycloakService.isAuthorized.and.returnValue(false);
    mockKeycloakService.getUsername.and.returnValue('testuser');

    const guard = TestBed.get(AuthGuard);
    guard.canActivate(null, createState('/some-path'));

    expect(mockLoggerService.warn).toHaveBeenCalledWith(
      jasmine.stringContaining('path="/some-path"'),
    );
    expect(mockLoggerService.warn).toHaveBeenCalledWith(
      jasmine.stringContaining('reason="not authorized"'),
    );
    expect(mockLoggerService.warn).toHaveBeenCalledWith(
      jasmine.stringContaining('user="testuser"'),
    );
  });

  [
    '/export-reports?download=1',
    '/lock-records?x=1',
    '/review-data?fiscal=2024#summary',
    '/manage-subareas?foo=bar&baz=qux',
  ].forEach((url) => {
    it(`should redirect non-admin users from ${url}`, () => {
      const routerMock = TestBed.get(Router);
      routerMock.parseUrl.calls.reset();
      mockKeycloakService.isAuthenticated.and.returnValue(true);
      mockKeycloakService.isAuthorized.and.returnValue(true);
      mockKeycloakService.isAllowed.and.returnValue(false);
      mockKeycloakService.getUsername.and.returnValue('');

      const guard = TestBed.get(AuthGuard);
      guard.canActivate(null, createState(url));

      expect(routerMock.parseUrl).toHaveBeenCalledWith('/');
    });
  });

  [
    { url: '/export-reports?download=1', role: 'export-reports' },
    { url: '/lock-records?x=1', role: 'lock-records' },
    { url: '/review-data?fiscal=2024#summary', role: 'review-data' },
    { url: '/manage-subareas?foo=bar', role: 'manage-subareas' },
  ].forEach(({ url, role }) => {
    it(`should log a warning with path and reason when denied from ${url}`, () => {
      mockKeycloakService.isAuthenticated.and.returnValue(true);
      mockKeycloakService.isAuthorized.and.returnValue(true);
      mockKeycloakService.isAllowed.and.returnValue(false);
      mockKeycloakService.getUsername.and.returnValue('testuser');

      const guard = TestBed.get(AuthGuard);
      guard.canActivate(null, createState(url));

      expect(mockLoggerService.warn).toHaveBeenCalledWith(
        jasmine.stringContaining(`path="${url.split(/[?#]/)[0]}"`),
      );
      expect(mockLoggerService.warn).toHaveBeenCalledWith(
        jasmine.stringContaining(`reason="missing role ${role}"`),
      );
    });
  });

  it('should allow admin users to activate lock-records when query params are present', () => {
    const routerMock = TestBed.get(Router);
    routerMock.parseUrl.calls.reset();
    mockKeycloakService.isAuthenticated.and.returnValue(true);
    mockKeycloakService.isAuthorized.and.returnValue(true);
    mockKeycloakService.isAllowed.and.returnValue(true);
    mockKeycloakService.getUsername.and.returnValue('adminuser');

    const guard = TestBed.get(AuthGuard);
    const result = guard.canActivate(null, createState('/lock-records?fiscal=2024'));

    expect(result).toBeTrue();
    expect(routerMock.parseUrl).not.toHaveBeenCalledWith('/');
    expect(mockLoggerService.warn).not.toHaveBeenCalled();
  });
});
