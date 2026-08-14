import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { of, throwError, Subject } from 'rxjs';

import { TokenInterceptor } from './token-interceptor';
import { KeycloakService } from 'src/app/services/keycloak.service';

const TEST_URL = '/api/test';
const BEARER_PREFIX = 'Bearer ';

// ---------------------------------------------------------------------------
// TEST-001: TokenInterceptor spec
// ---------------------------------------------------------------------------

describe('TokenInterceptor (TEST-001)', () => {
  let http: HttpClient;
  let controller: HttpTestingController;
  let keycloakSpy: jasmine.SpyObj<KeycloakService>;

  beforeEach(() => {
    keycloakSpy = jasmine.createSpyObj<KeycloakService>('KeycloakService', [
      'getToken',
      'refreshToken',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true,
        },
        { provide: KeycloakService, useValue: keycloakSpy },
      ],
    });

    http = TestBed.inject(HttpClient);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  // -------------------------------------------------------------------------
  // 1. Auth header is injected on every request
  // -------------------------------------------------------------------------
  describe('auth header injection', () => {
    it('should add an Authorization header that starts with ****** a token is available', () => {
      keycloakSpy.getToken.and.returnValue('sampletoken' as any);

      http.get(TEST_URL).subscribe();

      const req = controller.expectOne(TEST_URL);
      const authHeader = req.request.headers.get('Authorization');
      expect(authHeader).not.toBeNull();
      expect(authHeader!.startsWith(BEARER_PREFIX)).toBeTrue();
      expect(authHeader).not.toBe(BEARER_PREFIX);
      req.flush({});
    });

    it('should add an Authorization header with empty token when no token is available', () => {
      keycloakSpy.getToken.and.returnValue(null as any);

      http.get(TEST_URL).subscribe();

      const req = controller.expectOne(TEST_URL);
      expect(req.request.headers.get('Authorization')).toBe(BEARER_PREFIX);
      req.flush({});
    });
  });

  // -------------------------------------------------------------------------
  // 2. Non-403 errors pass through without refresh
  // -------------------------------------------------------------------------
  describe('non-403 error pass-through', () => {
    it('should propagate a 500 error without calling refreshToken', done => {
      keycloakSpy.getToken.and.returnValue('sampletoken' as any);

      http.get(TEST_URL).subscribe({
        next: () => fail('expected an error'),
        error: (err: HttpErrorResponse) => {
          expect(err.status).toBe(500);
          expect(keycloakSpy.refreshToken).not.toHaveBeenCalled();
          done();
        },
      });

      const req = controller.expectOne(TEST_URL);
      req.flush('Server error', { status: 500, statusText: 'Server Error' });
    });

    it('should propagate a 401 error without calling refreshToken', done => {
      keycloakSpy.getToken.and.returnValue('sampletoken' as any);

      http.get(TEST_URL).subscribe({
        next: () => fail('expected an error'),
        error: (err: HttpErrorResponse) => {
          expect(err.status).toBe(401);
          expect(keycloakSpy.refreshToken).not.toHaveBeenCalled();
          done();
        },
      });

      const req = controller.expectOne(TEST_URL);
      req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });
    });
  });

  // -------------------------------------------------------------------------
  // 3. 403 triggers token refresh and request retry
  // -------------------------------------------------------------------------
  describe('403 response triggers refresh and retry', () => {
    it('should call refreshToken once and retry the request on a 403 response', done => {
      keycloakSpy.getToken.and.returnValue('sampletoken' as any);
      keycloakSpy.refreshToken.and.returnValue(of(null));

      http.get(TEST_URL).subscribe({
        next: data => {
          expect(data).toEqual({ ok: true });
          expect(keycloakSpy.refreshToken).toHaveBeenCalledTimes(1);
          // One call for the initial request, one call for the retry
          expect(keycloakSpy.getToken).toHaveBeenCalledTimes(2);
          done();
        },
        error: () => fail('should not error'),
      });

      // Initial request — respond with 403 to trigger refresh + retry
      const firstReq = controller.expectOne(TEST_URL);
      expect(firstReq.request.headers.has('Authorization')).toBeTrue();
      firstReq.flush('Forbidden', { status: 403, statusText: 'Forbidden' });

      // Retry request — should succeed
      const retryReq = controller.expectOne(TEST_URL);
      expect(retryReq.request.headers.has('Authorization')).toBeTrue();
      retryReq.flush({ ok: true });
    });
  });

  // -------------------------------------------------------------------------
  // 4. Refresh failure propagates the error; no invented logout
  // -------------------------------------------------------------------------
  describe('refresh failure propagates error', () => {
    it('should propagate the refresh error when token refresh fails on 403', done => {
      keycloakSpy.getToken.and.returnValue('sampletoken' as any);
      const refreshError = new Error('refresh failed');
      keycloakSpy.refreshToken.and.returnValue(throwError(refreshError));

      http.get(TEST_URL).subscribe({
        next: () => fail('expected an error'),
        error: err => {
          expect(err).toBe(refreshError);
          expect(keycloakSpy.refreshToken).toHaveBeenCalledTimes(1);
          done();
        },
      });

      const req = controller.expectOne(TEST_URL);
      req.flush('Forbidden', { status: 403, statusText: 'Forbidden' });
    });
  });

  // -------------------------------------------------------------------------
  // 5. In-flight refresh concurrency — second 403 waits for the first refresh
  // -------------------------------------------------------------------------
  describe('in-flight refresh concurrency', () => {
    it('should not call refreshToken a second time when a refresh is already in progress', done => {
      keycloakSpy.getToken.and.returnValue('sampletoken' as any);

      // Use a Subject so the first refresh is still pending when the second
      // 403 arrives, allowing the interceptor to reuse the in-progress refresh.
      const refreshSubject = new Subject<null>();
      keycloakSpy.refreshToken.and.returnValue(refreshSubject.asObservable());

      let completedCount = 0;
      const finish = () => {
        completedCount++;
        if (completedCount === 2) {
          expect(keycloakSpy.refreshToken).toHaveBeenCalledTimes(1);
          done();
        }
      };

      // Launch two concurrent requests
      http.get('/api/a').subscribe({ next: finish, error: () => fail() });
      http.get('/api/b').subscribe({ next: finish, error: () => fail() });

      // Both initial requests receive a 403 before the refresh completes
      const reqA = controller.expectOne('/api/a');
      reqA.flush('Forbidden', { status: 403, statusText: 'Forbidden' });

      const reqB = controller.expectOne('/api/b');
      reqB.flush('Forbidden', { status: 403, statusText: 'Forbidden' });

      // Complete the single refresh — both retries should fire
      refreshSubject.next(null);
      refreshSubject.complete();

      // Flush both retry requests
      const retryA = controller.expectOne('/api/a');
      retryA.flush({ ok: true });

      const retryB = controller.expectOne('/api/b');
      retryB.flush({ ok: true });
    });
  });
});
