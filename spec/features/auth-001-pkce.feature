Feature: PKCE on real Keycloak initialisation
  As a security-conscious operator of the A&R Admin UI
  I want browser login to use PKCE S256
  So that a stolen authorization code cannot be exchanged for tokens by an attacker

  # Finding: RA AUTH-001 · Issue: #62
  # Assessment: Keycloak init must use pkceMethod S256 (not empty {}).
  # Verification: unit/service tests (no live Keycloak required in CI)
  # Out of scope: inventing localMockAuth; IdP client changes

  @R-10.1
  Scenario: Real Keycloak init enables PKCE S256
    Given Keycloak is enabled for the application
    When the Keycloak service initialises the adapter
    Then the init options include PKCE method S256
