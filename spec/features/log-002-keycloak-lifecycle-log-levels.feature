Feature: Keycloak lifecycle events logged above debug
  As a security-conscious operator of the A&R Admin UI
  I want auth errors, refresh failures, and logout recorded at warn or error
  So that those events are not silenced when debug logging is off

  # Finding: RA LOG-002 · Issue: #23
  # Checkpoint 1 — acceptance owned by human sign-off in spec/spec.md
  # Verification: unit tests on KeycloakService (LoggerService spy); no live IdP required

  Scenario: Auth error is logged at warn or error
    Given Keycloak JS has been initialised for a real session
    When the onAuthError callback fires
    Then a warn- or error-level log records the auth error
    And the log includes an identity hint when a username is available

  Scenario: Token refresh error is logged at warn or error
    Given Keycloak JS has been initialised for a real session
    When the onAuthRefreshError callback fires
    Then a warn- or error-level log records the refresh error

  Scenario: Logout is logged at warn or error
    Given Keycloak JS has been initialised for a real session
    When the onAuthLogout callback fires
    Then a warn- or error-level log records the logout
