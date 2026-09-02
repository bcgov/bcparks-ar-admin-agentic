Feature: Authorization failures in the route guard are logged
  As a security-conscious operator of the A&R Admin UI
  I want authorization denials recorded at an appropriate log level
  So that probing or misconfiguration leaves an auditable trail without leaking tokens

  # Finding: RA LOG-003 · Issue: #57
  # Verification: unit tests in src/app/guards/auth.guard.spec.ts (no live Keycloak required)

  @R-03.1
  Scenario: Authenticated but unauthorized user denial is logged before redirect
    Given I am authenticated
    And I am not authorized for the application
    When I activate any protected route
    Then the guard redirects me to "/unauthorized"
    And a warn-level authorization-failure log is emitted
    And the log includes the requested URL or path and a denial reason
    And the log does not include access tokens, refresh tokens, or raw credentials

  @R-03.2
  Scenario: Capability denial for a protected admin route is logged before redirect
    Given I am authenticated and authorized for the application
    And I am not allowed the "lock-records" capability
    When I activate the route with url "/lock-records"
    Then the guard redirects me to "/"
    And a warn-level authorization-failure log is emitted
    And the log includes the requested URL or path and a denial reason for the missing capability
    And the log does not include access tokens, refresh tokens, or raw credentials

  @R-03.3
  Scenario: Capability denial still logs when the URL has a query string
    Given I am authenticated and authorized for the application
    And I am not allowed the "manage-subareas" capability
    When I activate the route with url "/manage-subareas?x=1"
    Then the guard redirects me to "/"
    And a warn-level authorization-failure log is emitted
    And the log includes enough of the requested URL or path to identify the attempt

  @R-03.4
  Scenario: Allowed activation does not emit an authorization-failure log
    Given I am authenticated and authorized for the application
    And I am allowed the "lock-records" capability
    When I activate the route with url "/lock-records"
    Then the guard allows activation
    And no authorization-failure warn log is emitted for this activation
