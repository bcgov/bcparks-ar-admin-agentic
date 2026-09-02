Feature: Browser-console logging limitation documented
  As a security-conscious operator of the A&R Admin UI
  I want the console-only logging constraint documented with a minimal forward path
  So that teams understand observability gaps without premature SIEM integration

  # Finding: RA LOG-007 · Issue: #78
  # Scope: documentation + src constants/JSDoc — no server-side log shipping

  @R-20.1
  Scenario: Logging architecture documents console-only output
    Given the application logging documentation
    When the LoggerService output mechanism is described
    Then it states that logs are emitted to the browser console only
    And it states that no server-side persistence or SIEM integration exists yet

  @R-20.2
  Scenario: Forward path for future log shipping is documented
    Given the application logging documentation
    When a future server-side log shipping approach is described
    Then it references an optional runtime configuration hook
    And it does not require a backend endpoint to be implemented in this slice
