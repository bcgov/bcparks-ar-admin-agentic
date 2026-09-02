Feature: Keycloak lifecycle events logged above debug
  As a security-conscious operator of the A&R Admin UI
  I want auth errors, refresh failures, and logout recorded at warn or error
  So that those events are not silenced when debug logging is off

  # Finding: RA LOG-002 · Issue: #66
  # Assessment Expected: elevate onAuthError / onAuthRefreshError / onAuthLogout;
  #   include identity when available; persistent server-side audit endpoint.
  # This slice implements client-side level + identity. Server-side shipping = LOG-007 residual.
  # Verification: unit tests on KeycloakService (LoggerService spy); no live IdP required

  @R-05.1
  Scenario: Auth error is logged at warn or error
    Given Keycloak JS has been initialised for a real session
    When the onAuthError callback fires
    Then a warn- or error-level log records the auth error
    And the log includes a non-secret identity hint when available
    And the log does not include access tokens, refresh tokens, or raw credentials

  @R-05.2
  Scenario: Token refresh error is logged at warn or error
    Given Keycloak JS has been initialised for a real session
    When the onAuthRefreshError callback fires
    Then a warn- or error-level log records the refresh error
    And the log does not include access tokens, refresh tokens, or raw credentials

  @R-05.3
  Scenario: Logout is logged at warn or error
    Given Keycloak JS has been initialised for a real session
    When the onAuthLogout callback fires
    Then a warn- or error-level log records the logout
    And the log does not include access tokens, refresh tokens, or raw credentials

  @R-05.4
  Scenario: Success lifecycle callbacks may remain below warn
    Given Keycloak JS has been initialised for a real session
    When the onAuthSuccess or onAuthRefreshSuccess callback fires
    Then the callback may continue to use debug-level logging
    # Assessment called out errors/logout as security-critical; success may stay debug
