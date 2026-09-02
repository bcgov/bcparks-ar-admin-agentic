Feature: User-initiated logout
  As a BC Parks staff member using a shared workstation
  I want to end my session proactively
  So that the next user cannot access the application under my identity

  # Finding: RA AUTH-003 · Issue: #70
  # Verification: unit/service (and header) tests; no live Keycloak required in CI

  @R-13.1
  Scenario: Authenticated user can log out via Keycloak adapter
    Given Keycloak is enabled for the application
    And the user is authenticated
    When the user chooses to log out
    Then KeycloakService calls keycloakAuth.logout with a redirect URI
    And the session is terminated

  @R-13.2
  Scenario: Header exposes a Log out control when authenticated
    Given the user is authenticated
    When the application header is shown
    Then a Log out control is available
    And activating it invokes KeycloakService logout
