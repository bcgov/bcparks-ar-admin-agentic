Feature: Admin-only route enforcement in isAllowed()
  As a security-conscious operator of the A&R Admin UI
  I want export-reports and review-data to require admin privileges
  So that AuthGuard route checks are live code, not dead guards

  # Finding: RA AUTHZ-002 · Issue: #71
  # Verification: unit tests (no live Keycloak required)

  @R-14.1
  Scenario: Non-admin denied export-reports capability
    Given I am authenticated with a non-admin Keycloak session
    When isAllowed is checked for "export-reports"
    Then access is denied

  @R-14.2
  Scenario: Non-admin denied review-data capability
    Given I am authenticated with a non-admin Keycloak session
    When isAllowed is checked for "review-data"
    Then access is denied

  @R-14.3
  Scenario: Admin allowed export-reports and review-data capabilities
    Given I am authenticated with a sysadmin Keycloak session
    When isAllowed is checked for "export-reports"
    Then access is granted
    And isAllowed is checked for "review-data"
    And access is granted

  @R-14.4
  Scenario: AuthGuard redirects non-admin from export-reports path
    Given I am authenticated and authorized for the application
    And I am not allowed the "export-reports" capability
    When I activate the route with url "/export-reports"
    Then the guard redirects me to "/"

  @R-14.5
  Scenario: AuthGuard redirects non-admin from review-data path
    Given I am authenticated and authorized for the application
    And I am not allowed the "review-data" capability
    When I activate the route with url "/review-data"
    Then the guard redirects me to "/"
