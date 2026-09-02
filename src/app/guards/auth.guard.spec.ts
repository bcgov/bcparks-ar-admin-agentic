import { TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { KeycloakService } from '../services/keycloak.service';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  const mockKeycloakService = jasmine.createSpyObj('KeycloakService', [
    'isAuthenticated',
    'isAuthorized',
    'isAllowed',
    'getIdpFromToken',
    'login',
  ]);
  const mockRouter = jasmine.createSpyObj('Router', ['parseUrl']);

  const stateWithUrl = (url: string) => ({ url } as any);

  const mockAuthenticatedAuthorizedUser = (allowedCapabilities: string[] = []) => {
    mockKeycloakService.isAuthenticated.and.returnValue(true);
    mockKeycloakService.isAuthorized.and.returnValue(true);
    mockKeycloakService.getIdpFromToken.and.returnValue('');
    mockKeycloakService.isAllowed.and.callFake((capability: string) =>
      allowedCapabilities.includes(capability)
    );
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: KeycloakService, useValue: mockKeycloakService },
        { provide: Router, useValue: mockRouter },
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
    mockKeycloakService.login.calls.reset();
    mockRouter.parseUrl.and.stub();
    mockKeycloakService.isAuthenticated.and.stub();
    mockKeycloakService.isAuthorized.and.stub();
    mockKeycloakService.isAllowed.and.stub();
    mockKeycloakService.getIdpFromToken.and.stub();
    mockKeycloakService.login.and.stub();
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

  it('should redirect non-admin from lock-records when query string is present', () => {
    const redirect = {} as any;
    mockRouter.parseUrl.and.returnValue(redirect);
    mockAuthenticatedAuthorizedUser();

    const guard = TestBed.get(AuthGuard);
    const result = guard.canActivate(null, stateWithUrl('/lock-records?x=1'));

    expect(result).toBe(redirect);
    expect(mockRouter.parseUrl).toHaveBeenCalledWith('/');
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
