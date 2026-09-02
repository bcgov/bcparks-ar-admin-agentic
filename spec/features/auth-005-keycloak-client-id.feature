Feature: Keycloak client ID must be configured
  As a security-conscious operator deploying the A&R Admin UI
  I want missing KEYCLOAK_CLIENT_ID to fail loudly at startup
  So that misconfigured deployments do not silently use a wrong OAuth client

  # Finding: RA AUTH-005 · Issue: #84

  @R-26.1
  Scenario: Missing KEYCLOAK_CLIENT_ID fails Keycloak init clearly
    Given local mock auth is not active
    And Keycloak is enabled for the application
    And KEYCLOAK_CLIENT_ID is not set in runtime configuration
    When the Keycloak service initialises
    Then init rejects with a clear configuration error
    And no hardcoded fallback client ID is used

  @R-26.2
  Scenario: Configured KEYCLOAK_CLIENT_ID is passed to Keycloak adapter
    Given local mock auth is not active
    And Keycloak is enabled for the application
    And KEYCLOAK_CLIENT_ID is set to a valid client id
    When the Keycloak service initialises
    Then the adapter is created with that client id
