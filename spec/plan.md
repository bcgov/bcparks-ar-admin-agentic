# Plan — AUTH-004 token refresh failure redirect

> Checkpoint 2 for issue [#83](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/83).

## Approach

On onTokenExpired, if updateToken rejects: log error and window.location.assign('/login'). Unit test with mocked updateToken failure. Append evidence.
