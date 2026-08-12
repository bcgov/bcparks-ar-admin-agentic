Feature: PKCE on real Keycloak initialisation
  As a security-conscious operator of the A&R Admin UI
  I want browser login to use PKCE S256
  So that a stolen authorization code cannot be exchanged for tokens by an attacker

  # Finding: RA AUTH-001 · Issue: #11
  # Checkpoint 1 — acceptance owned by human sign-off in spec/spec.md
  # Verification: unit/service tests (no live Keycloak required in CI)

  Scenario: Real Keycloak init enables PKCE S256
    Given local mock auth is not active
    And Keycloak is enabled for the application
    When the Keycloak service initialises the adapter
    Then the init options include PKCE method S256

  Scenario: Local mock auth does not call Keycloak init with PKCE
    Given local mock auth is active
    When the auth service initialises
    Then a fake local session is established without Keycloak adapter init
