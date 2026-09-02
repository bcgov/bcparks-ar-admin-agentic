Feature: Bearer token host allowlist in TokenInterceptor
  As a security-conscious operator of the A&R Admin UI
  I want JWT bearer tokens sent only to the configured API host
  So that third-party HTTP calls do not receive session credentials

  # Finding: RA AUTH-007 · Issue: #86

  @R-28.1
  Scenario: Request to configured API host receives Bearer header
    Given API_LOCATION is configured for the backend API
    And the interceptor has a session token
    When an HTTP request targets that API host
    Then the request includes Authorization Bearer

  @R-28.2
  Scenario: Request to third-party host does not receive Bearer header
    Given API_LOCATION is configured for the backend API
    And the interceptor has a session token
    When an HTTP request targets a different host
    Then the request does not include an Authorization header
