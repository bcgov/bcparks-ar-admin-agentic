Feature: TokenInterceptor refreshes on 401 not 403
  As a security-conscious operator of the A&R Admin UI
  I want token refresh triggered only for authentication failures
  So that authorization failures are not masked by unnecessary refresh cycles

  # Finding: RA AUTH-006 · Issue: #85

  @R-27.1
  Scenario: HTTP 401 triggers token refresh and request retry
    Given an authenticated API request
    When the API responds with HTTP 401 Unauthorized
    Then the interceptor refreshes the token once
    And retries the original request

  @R-27.2
  Scenario: HTTP 403 passes through without token refresh
    Given an authenticated API request
    When the API responds with HTTP 403 Forbidden
    Then the interceptor does not refresh the token
    And the 403 error is propagated to the caller
