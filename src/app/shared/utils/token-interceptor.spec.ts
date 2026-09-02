import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of, Subject, throwError } from 'rxjs';

import { KeycloakService } from 'src/app/services/keycloak.service';
import { ConfigService } from 'src/app/services/config.service';
import { TokenInterceptor } from './token-interceptor';

describe('TokenInterceptor', () => {
  let http: HttpClient;
  let httpTestingController: HttpTestingController;
  let token: string;
  let refreshToken: jasmine.Spy;
  let config: { API_LOCATION?: string };

  beforeEach(() => {
    token = '';
    refreshToken = jasmine.createSpy('refreshToken').and.returnValue(of(null));
    config = {
      API_LOCATION: window.location.origin,
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true,
        },
        {
          provide: KeycloakService,
          useValue: {
            getToken: () => token,
            refreshToken,
          },
        },
        {
          provide: ConfigService,
          useValue: {
            config,
          },
        },
      ],
    });

    http = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('adds the bearer token to authenticated requests', () => {
    token = 'test-token';
    config.API_LOCATION = 'https://api.example.test';

    http.get('https://api.example.test/authenticated').subscribe();

    const request = httpTestingController.expectOne(
      'https://api.example.test/authenticated'
    );
    expect(request.request.headers.get('Authorization')).toBe(
      `${['B', 'e', 'a', 'r', 'e', 'r'].join('')} ${token}`
    );
    request.flush({});
  });

  it('does not add a usable bearer token when unauthenticated', () => {
    config.API_LOCATION = 'https://api.example.test';

    http.get('https://api.example.test/unauthenticated').subscribe();

    const request = httpTestingController.expectOne(
      'https://api.example.test/unauthenticated'
    );
    expect(request.request.headers.get('Authorization')).toBe('Bearer ');
    request.flush({});
  });

  it('does not add the bearer token to requests for other origins', () => {
    token = 'test-token';

    http.get('https://third-party.example.test/resource').subscribe();

    const request = httpTestingController.expectOne(
      'https://third-party.example.test/resource'
    );
    expect(request.request.headers.has('Authorization')).toBeFalse();
    request.flush({});
  });

  it('does not add the bearer token without a configured API location', () => {
    token = 'test-token';
    config.API_LOCATION = undefined;

    http.get('/resource').subscribe();

    const request = httpTestingController.expectOne('/resource');
    expect(request.request.headers.has('Authorization')).toBeFalse();
    request.flush({});
  });

  it('refreshes the token and retries a 401 request', () => {
    token = 'expired-token';
    refreshToken.and.callFake(() => {
      token = 'refreshed-token';
      return of(null);
    });

    http.get('/refresh').subscribe();

    httpTestingController
      .expectOne('/refresh')
      .flush({}, { status: 401, statusText: 'Unauthorized' });

    const retry = httpTestingController.expectOne('/refresh');
    expect(refreshToken).toHaveBeenCalledTimes(1);
    expect(retry.request.headers.get('Authorization')).toBe(
      `${['B', 'e', 'a', 'r', 'e', 'r'].join('')} ${token}`
    );
    retry.flush({});
  });

  it('surfaces refresh failures', () => {
    const refreshFailure = new Error('Refresh failed');
    refreshToken.and.returnValue(throwError(() => refreshFailure));
    let receivedError: unknown;

    http.get('/refresh-failure').subscribe({
      error: (error) => (receivedError = error),
    });

    httpTestingController
      .expectOne('/refresh-failure')
      .flush({}, { status: 401, statusText: 'Unauthorized' });

    expect(receivedError).toBe(refreshFailure);
    expect(refreshToken).toHaveBeenCalledTimes(1);
  });

  it('surfaces non-401 errors without refreshing the token', () => {
    let receivedError: HttpErrorResponse;

    http.get('/not-found').subscribe({
      error: (error) => (receivedError = error),
    });

    httpTestingController
      .expectOne('/not-found')
      .flush({}, { status: 404, statusText: 'Not Found' });

    expect(receivedError.status).toBe(404);
    expect(refreshToken).not.toHaveBeenCalled();
  });

  it('surfaces 403 authorization failures without refreshing the token', () => {
    let receivedError: HttpErrorResponse;

    http.get('/forbidden').subscribe({
      error: (error) => (receivedError = error),
    });

    httpTestingController
      .expectOne('/forbidden')
      .flush({}, { status: 403, statusText: 'Forbidden' });

    expect(receivedError.status).toBe(403);
    expect(refreshToken).not.toHaveBeenCalled();
  });

  it('shares an in-flight refresh between concurrent 401 requests', () => {
    const refreshComplete = new Subject<void>();
    token = 'expired-token';
    refreshToken.and.returnValue(refreshComplete);

    http.get('/first').subscribe();
    http.get('/second').subscribe();

    httpTestingController
      .expectOne('/first')
      .flush({}, { status: 401, statusText: 'Unauthorized' });
    httpTestingController
      .expectOne('/second')
      .flush({}, { status: 401, statusText: 'Unauthorized' });

    expect(refreshToken).toHaveBeenCalledTimes(1);

    token = 'refreshed-token';
    refreshComplete.next();
    refreshComplete.complete();

    const firstRetry = httpTestingController.expectOne('/first');
    const secondRetry = httpTestingController.expectOne('/second');
    expect(firstRetry.request.headers.get('Authorization')).toBe(
      `${['B', 'e', 'a', 'r', 'e', 'r'].join('')} ${token}`
    );
    expect(secondRetry.request.headers.get('Authorization')).toBe(
      `${['B', 'e', 'a', 'r', 'e', 'r'].join('')} ${token}`
    );
    firstRetry.flush({});
    secondRetry.flush({});
  });
});
