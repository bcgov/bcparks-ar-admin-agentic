Feature: isAdmin handles atypical JWT without roles safely
  As a maintainer of BC Parks admin authorization
  I want isAdmin() to never throw on malformed resource_access
  So that route guards fail closed instead of crashing

  # Finding: RA AUTHZ-005 · Issue: #89

  @R-31.1
  Scenario: isAdmin returns false when roles property is absent
    Given the user token has resource_access without a roles array
    When isAdmin is evaluated
    Then the result is false
    And no TypeError is thrown

  @R-31.2
  Scenario: isAdmin still returns true for valid admin token
    Given the user token includes the admin role in resource_access
    When isAdmin is evaluated
    Then the result is true
