import { Injectable } from '@angular/core';
import {
  UrlTree,
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { KeycloakService } from '../services/keycloak.service';
import { LoggerService } from '../services/logger.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private readonly keycloakService: KeycloakService,
    private readonly router: Router,
    private readonly loggerService: LoggerService,
  ) { }

  /**
   * Records a structured security audit event for an authorization failure
   * without leaking the raw auth token or any secrets.
   */
  private logAuthzFailure(requestedUrl: string | undefined, outcome: string) {
    const { userId, email } = this.keycloakService.getUserIdentity();
    this.loggerService.warn({
      eventType: 'authz_denied',
      userId,
      email,
      requestedUrl: requestedUrl ?? '',
      outcome,
      timestamp: new Date().toISOString(),
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean | UrlTree {
    // When a successful login occurs, we store the identity provider used in sessionStorage.
    const lastIdp = sessionStorage.getItem(
      this.keycloakService.LAST_IDP_AUTHENTICATED,
    );

    // Not authenticated
    if (!this.keycloakService.isAuthenticated()) {
      if (lastIdp === null) {
        // If an identity provider hasn't been selected then show the login page.
        return this.router.parseUrl('/login');
      }
      // If an identity provider was already selected and successfully authenticated
      // then do a keycloak login with that identity provider.

      // remove the sessionStorage value first, so if this authentication attempt
      // fails then the user will get the login page next time.
      sessionStorage.removeItem(this.keycloakService.LAST_IDP_AUTHENTICATED);

      // log in using the last identity provider that worked
      this.keycloakService.login(lastIdp);
      return false;
    }

    if (lastIdp === null) {
      // Store the identity provider that was used to successfully log in.
      // Even if the user is unauthorized, we still want to store this because
      // we don't have a logout, so there is no point allowing the user to select
      // a different IDP, as Keycloak will just ignore the selection when the user
      // is authenticated already.
      const idp = this.keycloakService.getIdpFromToken();
      if (idp !== '') {
        sessionStorage.setItem(
          this.keycloakService.LAST_IDP_AUTHENTICATED,
          idp,
        );
      }
    }

    // Not authorized
    if (!this.keycloakService.isAuthorized()) {
      // login was successful but the user doesn't have necessary Keycloak roles.
      this.logAuthzFailure(state?.url, 'no_roles');
      return this.router.parseUrl('/unauthorized');
    }

    const requestedPath = state.url.split(/[?#]/)[0];

    if (
      !this.keycloakService.isAllowed('export-reports') &&
      requestedPath === '/export-reports'
    ) {
      this.logAuthzFailure(state.url, 'not_allowed:export-reports');
      return this.router.parseUrl('/');
    }

    if (
      !this.keycloakService.isAllowed('lock-records') &&
      requestedPath === '/lock-records'
    ) {
      this.logAuthzFailure(state.url, 'not_allowed:lock-records');
      return this.router.parseUrl('/');
    }

    if (
      !this.keycloakService.isAllowed('review-data') &&
      requestedPath === '/review-data'
    ) {
      this.logAuthzFailure(state.url, 'not_allowed:review-data');
      return this.router.parseUrl('/');
    }

    if (!this.keycloakService.isAllowed('manage-subareas') &&
      requestedPath === '/manage-subareas'
    ) {
      this.logAuthzFailure(state.url, 'not_allowed:manage-subareas');
      return this.router.parseUrl('/');
    }

    // Show the requested page.
    return true;
  }
}
