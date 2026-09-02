Feature: End-to-end test scaffold and smoke coverage
  As a security-conscious operator of the A&R Admin UI
  I want a minimal E2E framework with smoke tests and auth-boundary scaffold
  So that security properties can be verified incrementally without blocking on full Keycloak automation

  # Finding: RA TEST-003 · Issue: #81

  @R-23.1
  Scenario: Playwright E2E scaffold is present
    Given the project package manifest
    When E2E dependencies and scripts are inspected
    Then Playwright is listed as a dev dependency
    And an e2e test script is available

  @R-23.2
  Scenario: Smoke test loads the application shell
    Given the dev server is running
    When the smoke E2E test navigates to the app root
    Then the page title includes A&R Admin
    And the app-root element is visible

  @R-23.3
  Scenario: E2E scaffold documents planned auth boundary tests
    Given the E2E testing documentation
    When future security integration tests are described
    Then unauthenticated guarded-route redirects are listed
    And role-based route denial tests are listed as follow-up work
