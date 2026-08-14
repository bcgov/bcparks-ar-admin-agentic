Feature: HTTP token interceptor has unit coverage
  As a developer of the A&R Admin UI
  I want the session-token HTTP helper covered by tests
  So that header injection and 403 refresh/retry regressions are caught in CI

  # Finding: RA TEST-001 · Issue: #51
  # Verification: unit tests in token-interceptor.spec.ts (or equivalent)
  # Out of scope: AUTH-006 (401 vs 403), AUTH-007 (host allowlist), logout-on-refresh-failure

  Scenario: Bearer token is attached to outbound requests
    Given a session token is available
    When an HTTP request is made
    Then the request includes an Authorization Bearer header with that token

  Scenario: Missing token still sends a Bearer header
    Given no session token is available
    When an HTTP request is made
    Then the request includes an Authorization Bearer header
    And the interceptor behaviour is otherwise unchanged

  Scenario: Non-forbidden errors pass through
    Given an HTTP request fails with a status other than 403
    When the interceptor handles the error
    Then it does not refresh the session token
    And the error is propagated

  Scenario: Forbidden response refreshes the token and retries
    Given an HTTP request fails with 403
    And token refresh will succeed
    When the interceptor handles the error
    Then it refreshes the session token
    And it retries the request with an Authorization Bearer header

  Scenario: Concurrent forbidden responses share one refresh
    Given a token refresh is already in progress
    When another request fails with 403
    Then the interceptor does not start a second refresh
    And it retries after the in-flight refresh completes

  Scenario: Refresh failure is propagated
    Given an HTTP request fails with 403
    And token refresh will fail
    When the interceptor handles the error
    Then the refresh error is propagated
    And no new logout behaviour is introduced
