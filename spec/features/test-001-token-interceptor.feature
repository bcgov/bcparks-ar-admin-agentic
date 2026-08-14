Feature: Token interceptor regression coverage
  As a developer of the A&R Admin UI
  I want unit tests for the HTTP token interceptor
  So that header injection and 403 refresh/retry regressions are caught in CI

  # Finding: RA TEST-001 · Issue: #51
  # Current behaviour only — do not "fix" AUTH-006 (401 vs 403) or AUTH-007 (host allowlist)

  Scenario: Authenticated request receives a Bearer header
    Given the interceptor has a session token
    When an HTTP request is sent
    Then the request includes Authorization Bearer with that token

  Scenario: Non-403 errors pass through
    Given an HTTP request that fails with a status other than 403
    When the interceptor handles the error
    Then it does not refresh the token
    And the error is surfaced to the caller

  Scenario: HTTP 403 refreshes the token and retries
    Given an HTTP request that fails with 403
    When the interceptor handles the error
    Then it refreshes the session token
    And it retries the request with an Authorization Bearer header

  Scenario: Refresh failure surfaces the error
    Given an HTTP request that fails with 403
    And token refresh fails
    When the interceptor handles the error
    Then the failure is surfaced
    And no new logout behaviour is introduced

  Scenario: Concurrent 403s share one in-flight refresh
    Given a token refresh is already in progress
    When another request fails with 403
    Then a second refresh is not started
