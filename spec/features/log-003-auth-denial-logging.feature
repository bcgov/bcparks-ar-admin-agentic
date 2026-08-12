Feature: Log authorization denials from AuthGuard
  As a security-conscious operator of the A&R Admin UI
  I want authorization failures to be logged at warn level
  So that probing of protected routes leaves a client-side audit trail

  # Finding: RA LOG-003 · Issue: #15
  # Checkpoint 1 — acceptance owned by human sign-off in spec/spec.md
  # Verification: unit tests on AuthGuard (LoggerService spy); no live IdP required

  Scenario: Unauthorized user denial is logged
    Given I am authenticated
    And I am not authorized for the application
    When AuthGuard denies access and redirects to "/unauthorized"
    Then a warn-level log records the denial
    And the log includes the requested path and a denial reason

  Scenario: Admin-only route denial is logged
    Given I am authenticated and authorized for the application
    And I lack the admin capability for "lock-records"
    When AuthGuard redirects me away from "/lock-records"
    Then a warn-level log records the denial
    And the log includes the requested path and a denial reason
