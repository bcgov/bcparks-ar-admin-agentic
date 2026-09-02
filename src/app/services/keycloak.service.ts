import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../shared/utils/constants';
import { ConfigService } from './config.service';
import { LoggerService } from './logger.service';
import { ToastService } from './toast.service';

declare let Keycloak: any;

@Injectable()
export class KeycloakService {
  public LAST_IDP_AUTHENTICATED = 'kc-last-idp-authenticated';
  private keycloakAuth: any;
  private keycloakEnabled: boolean;
  private keycloakUrl: string;
  private keycloakRealm: string;

  public readonly idpHintEnum = {
    BCEID: 'bceid',
    BCSC: 'bcsc',
    IDIR: 'idir',
  };

  constructor(
    private configService: ConfigService,
    private loggerService: LoggerService,
    private toastService: ToastService
  ) {}

  async init() {
    // Load up the config service data
    this.keycloakEnabled = this.configService.config['KEYCLOAK_ENABLED'];
    this.keycloakUrl = this.configService.config['KEYCLOAK_URL'];
    this.keycloakRealm = this.configService.config['KEYCLOAK_REALM'];

    if (this.keycloakEnabled) {
      // Bootup KC
      const keycloak_client_id =
        this.configService.config['KEYCLOAK_CLIENT_ID'];

      return new Promise<void>((resolve, reject) => {
        if (!keycloak_client_id) {
          // Do not silently fall back to another application's OAuth
          // client ID: fail fast so a misconfigured KEYCLOAK_CLIENT_ID
          // is caught instead of authenticating against the wrong client.
          this.loggerService.error(
            'KC Auth init failed: KEYCLOAK_CLIENT_ID is not configured.'
          );
          this.toastService.addMessage(
            'Failed to initialize Keycloak.',
            'Keycloak Service',
            Constants.ToastTypes.ERROR
          );
          reject();
          return;
        }

        const config = {
          url: this.keycloakUrl,
          realm: this.keycloakRealm,
          clientId: keycloak_client_id,
        };

        this.loggerService.debug('KC Auth init.');

        this.keycloakAuth = new Keycloak(config);

        this.keycloakAuth.onAuthSuccess = () => {
          this.loggerService.debug('onAuthSuccess');
        };

        this.keycloakAuth.onAuthError = () => {
          this.logAuthLifecycleEvent('onAuthError', 'error');
        };

        this.keycloakAuth.onAuthRefreshSuccess = () => {
          this.loggerService.debug('onAuthRefreshSuccess');
        };

        this.keycloakAuth.onAuthRefreshError = () => {
          this.logAuthLifecycleEvent('onAuthRefreshError', 'error');
        };

        this.keycloakAuth.onAuthLogout = () => {
          this.logAuthLifecycleEvent('onAuthLogout', 'warn');
        };

        // Try to get refresh tokens in the background
        this.keycloakAuth.onTokenExpired = () => {
          return this.keycloakAuth
            .updateToken()
            .then((refreshed) => {
              this.loggerService.log(`KC refreshed token?: ${refreshed}`);
            })
            .catch((err) => {
              this.loggerService.error(`KC refresh error: ${err}`);
              // The session can no longer be refreshed: force a clean
              // re-authentication instead of leaving the user in an
              // authenticated-looking state with an unusable token.
              this.redirectToLogin();
            });
        };

        // Initialize.
        this.keycloakAuth
          .init({ pkceMethod: 'S256' })
          .then((auth) => {
            this.loggerService.debug(`KC Refresh Success?:${this.keycloakAuth.authServerUrl}`);
            this.loggerService.log(`KC Success: ${auth}`);
            resolve();
          })
          .catch((err) => {
            this.toastService.addMessage(
              'Failed to initialize Keycloak.',
              'Keycloak Service',
              Constants.ToastTypes.ERROR
            );
            this.loggerService.log(`KC error: ${err}`);
            reject();
          });
      });
    }
  }

  /**
   * Check if the current user is logged in.
   *
   * @returns {boolean} true if the user is logged in.
   * @memberof KeycloakService
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    return this.keycloakAuth && this.keycloakAuth.authenticated === true;
  }

  /**
   * Returns the parsed claims from the Keycloak adapter's library-verified
   * token for the current real auth session. This must be used (instead of
   * `JwtUtil.decodeToken`) for any role/IDP/identity decision on the real
   * Keycloak auth path, since `tokenParsed` reflects the adapter's own
   * signature-verified session state.
   *
   * @returns {any} the parsed token claims, or undefined when unavailable.
   * @memberof KeycloakService
   */
  getTokenClaims(): any {
    return this.keycloakAuth && this.keycloakAuth.tokenParsed;
  }

  /**
   * Check if the current user is logged in and has admin access.
   *
   * @returns {boolean} true if the user has access, false otherwise.
   * @memberof KeycloakService
   */
  isAuthorized(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    const jwt = this.getTokenClaims();

    if (
      !(
        jwt &&
        jwt.resource_access &&
        jwt.resource_access['attendance-and-revenue'] &&
        jwt.resource_access['attendance-and-revenue'].roles
      )
    ) {
      return false;
    }

    return jwt.resource_access['attendance-and-revenue'].roles.length >= 1;
  }

  /**
   * Returns whether or not the user has access to a route
   *
   * @returns {boolean} User user has access to route
   * @memberof KeycloakService
   */
  isAllowed(service): boolean {
    // admin only routes
    let adminOnlyRoutes = [
      'lock-records',
      'manage-subareas',
      'export-reports',
      'review-data'
    ]
    if (!adminOnlyRoutes.find(route => route === service)) {
      return true;
    }

    return this.isAdmin();
  }

  /**
   * Returns whether or not the user has admin priviledges
   * @returns  {boolean} User is sysadmin
   * @memberof KeycloakService
   */
  isAdmin(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    const jwt = this.getTokenClaims();
    return !!jwt?.resource_access?.['attendance-and-revenue']?.roles?.includes(
      Constants.ApplicationRoles.ADMIN
    );
  }

  /**
   * Returns the current keycloak auth token.
   *
   * @returns {string} keycloak auth token.
   * @memberof KeycloakService
   */
  getToken(): string {
    return this.keycloakAuth && this.keycloakAuth.token;
  }

  /**
   * Returns an observable that emits when the auth token has been refreshed.
   * Call {@link KeycloakService#getToken} to fetch the updated token.
   *
   * @returns {Observable<string>}
   * @memberof KeycloakService
   */
  refreshToken(): Observable<any> {
    return new Observable((observer) => {
      this.keycloakAuth
        .updateToken(30)
        .then((refreshed) => {
          this.loggerService.log(`KC refreshed token?: ${refreshed}`);
          observer.next();
          observer.complete();
        })
        .catch((err) => {
          this.loggerService.log(`KC refresh error: ${err}`);
          observer.error();
        });

      return { unsubscribe() {} };
    });
  }

  /**
   * Builds the absolute login URL for the current deployment, or returns null
   * when the browser is already on the login page (so repeated token-expiry
   * events cannot cause a redirect loop).
   *
   * @param {string} currentPath the current window pathname.
   * @returns {string} the login URL, or null when no navigation is needed.
   * @memberof KeycloakService
   */
  private getLoginUrl(currentPath: string): string | null {
    const baseHref = document.querySelector('base')?.getAttribute('href') || '/';
    const loginUrl = new URL('login', new URL(baseHref, window.location.origin));

    if (currentPath === loginUrl.pathname) {
      return null;
    }

    return loginUrl.toString();
  }

  /**
   * Sends the browser to the login page after the Keycloak session can no
   * longer be refreshed. A full navigation (rather than a router navigation)
   * is used so all in-memory state tied to the expired session is discarded.
   *
   * @memberof KeycloakService
   */
  private redirectToLogin() {
    const loginUrl = this.getLoginUrl(window.location.pathname);

    if (!loginUrl) {
      return;
    }

    window.location.assign(loginUrl);
  }

  private logAuthLifecycleEvent(eventType: string, level: 'warn' | 'error') {
    const { userId, email } = this.getUserIdentity();
    const message = `${eventType} userId=${userId || 'unavailable'} email=${email || 'unavailable'}`;
    this.loggerService[level](message);
  }

  public getWelcomeMessage(): string {
    const token = this.getToken();

    if (!token) {
      return '';
    }

    const jwt = this.getTokenClaims();

    if (!jwt || !jwt.name) {
      return '';
    }

    return `${jwt.name}`;
  }

  /**
   * Redirects to keycloak and logs in
   *
   * @param {string} idpHint see idpHintEnum for valid values
   * @memberof KeycloakService
   */
  login(idpHint: string) {
    let redirectUri = window.location.href;
    // by default keycloak login will want to redirect back to the login page
    // redirect to '/dayuse' instead
    if (redirectUri.endsWith('/login')) {
      redirectUri = redirectUri.slice(0, redirectUri.lastIndexOf('/'));
    }
    return (
      this.keycloakAuth &&
      this.keycloakAuth.login({ idpHint: idpHint, redirectUri: redirectUri })
    );
  }

  /**
   * Redirects to Keycloak and logs out.
   *
   * @memberof KeycloakService
   */
  logout() {
    const baseHref = document.querySelector('base')?.getAttribute('href') || '/';
    const redirectUri = new URL(baseHref, window.location.origin).toString();
    return this.keycloakAuth && this.keycloakAuth.logout({ redirectUri });
  }

  /**
   * Infers the identity provider from the JWT token
   *
   * @remarks
   * If IDIR and BCEID users are being redirected to the BCSC login
   * page to re-authenticate, it means the client mappers in Keycloak
   * (idir_userid and bceid_userid) haven't been properly setup.
   *
   * @memberof KeycloakService
   */
  getIdpFromToken(): string {
    const token = this.getToken();

    if (!token) {
      return '';
    }

    const jwt = this.getTokenClaims();

    // idir users have an idir_userid property
    if (jwt.idir_userid !== undefined) {
      return this.idpHintEnum.IDIR;
    }

    // bceid users will have a bceid_userid property
    if (jwt.bceid_userid !== undefined) {
      return this.idpHintEnum.BCEID;
    }

    // BCSC users have no distinguishing traits, but BCSC is asssumed
    // if it's not BCeID or IDIR
    return this.idpHintEnum.BCSC;
  }

  /**
   * Extracts a minimal, non-sensitive identity summary from the current auth
   * token for use in security audit log entries. Never returns the raw token.
   *
   * @returns {{ userId: string; email: string }} the user's subject id and
   * email, or empty strings when unavailable.
   * @memberof KeycloakService
   */
  getUserIdentity(): { userId: string; email: string } {
    const token = this.getToken();

    if (!token) {
      return { userId: '', email: '' };
    }

    const jwt = this.getTokenClaims();

    return {
      userId: jwt?.sub ?? '',
      email: jwt?.email ?? '',
    };
  }
}
