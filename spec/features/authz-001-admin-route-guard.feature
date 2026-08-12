Feature: Admin route guard ignores query string and fragment
  As a security-conscious operator of the A&R Admin UI
  I want admin-only routes to enforce capabilities on the path
  So that adding query parameters cannot bypass client-side route protection

  # Finding: RA AUTHZ-001 · Issue: #6
  # Verification: unit tests in src/app/guards/auth.guard.spec.ts (no live Keycloak required)

  Scenario: Non-admin denied lock-records when query string present
    Given I am authenticated and authorized for the application
    And I am not allowed the "lock-records" capability
    When I activate the route with url "/lock-records?x=1"
    Then the guard redirects me to "/"
    And I am not allowed to activate Lock Records

  Scenario: Non-admin denied manage-subareas when query string present
    Given I am authenticated and authorized for the application
    And I am not allowed the "manage-subareas" capability
    When I activate the route with url "/manage-subareas?foo=bar"
    Then the guard redirects me to "/"

  Scenario: Non-admin denied export-reports when query string present
    Given I am authenticated and authorized for the application
    And I am not allowed the "export-reports" capability
    When I activate the route with url "/export-reports?download=1"
    Then the guard redirects me to "/"

  Scenario: Admin allowed lock-records when query string present
    Given I am authenticated and authorized for the application
    And I am allowed the "lock-records" capability
    When I activate the route with url "/lock-records?fiscal=2024"
    Then the guard allows activation

  Scenario: Path without query string still denied for non-admin
    Given I am authenticated and authorized for the application
    And I am not allowed the "lock-records" capability
    When I activate the route with url "/lock-records"
    Then the guard redirects me to "/"
