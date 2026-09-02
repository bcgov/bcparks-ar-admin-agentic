Feature: Token interceptor unit coverage
  As a developer of the A&R Admin UI
  I want automated tests for the HTTP token interceptor
  So that Bearer injection and 403 refresh/retry regressions are caught in CI

  # Finding: RA TEST-001 · Issue: #68
  # Assessment Expected: (1) Bearer when authenticated (2) no usable auth when unauthenticated
  #   (3) 403 → refresh + retry (4) refresh failure causes logout
  # Conscious scope: this slice is coverage of *current* interceptor behaviour.
  # Do not "fix" AUTH-006 (401 vs 403) or AUTH-007 (host allowlist) here.
  # Expected (4) logout requires AUTH-003; assert failure is surfaced and no fake logout is invented.
  # Verification: Karma/Jasmine via HttpClientTestingModule (no live Keycloak)

  @R-04.1
  Scenario: Authenticated request receives a Bearer header
    Given the interceptor has a session token
    When an HTTP request is sent
    Then the request includes an Authorization header with Bearer and that token

  @R-04.2
  Scenario: Unauthenticated request has no usable Bearer token value
    Given the interceptor has no session token
    When an HTTP request is sent
    Then the Authorization header does not contain a non-empty Bearer token value
    # Note: current code may still set "Authorization: Bearer " (empty suffix).
    # Assessment preferred "header absent"; omitting the header entirely is deferred (see Open questions).

  @R-04.3
  Scenario: HTTP 403 refreshes the token and retries
    Given an HTTP request that fails with 403
    When the interceptor handles the error
    Then it refreshes the session token
    And it retries the request with an Authorization Bearer header

  @R-04.4
  Scenario: Refresh failure surfaces the error without inventing logout
    Given an HTTP request that fails with 403
    And token refresh fails
    When the interceptor handles the error
    Then the failure is surfaced to the caller
    And no logout behaviour is introduced in this slice
    # Assessment Expected (4) "refresh failure causes logout" is residual until AUTH-003/AUTH-004

  @R-04.5
  Scenario: Non-403 errors pass through without refresh
    Given an HTTP request that fails with a status other than 403
    When the interceptor handles the error
    Then it does not refresh the token
    And the error is surfaced to the caller

  @R-04.6
  Scenario: Concurrent 403s share one in-flight refresh
    Given a token refresh is already in progress
    When another request fails with 403
    Then a second refresh is not started
