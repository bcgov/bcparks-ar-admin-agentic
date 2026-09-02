Feature: LoggerService safe default when logLevel is missing
  As a security-conscious operator of the A&R Admin UI
  I want warnings and errors logged even when env.js omits logLevel
  So that silent deployments do not hide security-relevant events

  # Finding: RA LOG-004 · Issue: #75
  # Verification: unit tests in logger.service.spec.ts

  @R-17.1
  Scenario: Missing logLevel defaults to Warn not Off
    Given window.__env has no logLevel property
    When LoggerService evaluates whether to log a warning
    Then the warning is emitted
    And LoggerService does not default to LogLevel.Off

  @R-17.2
  Scenario: Startup warns when logLevel is not configured
    Given window.__env has no logLevel property
    When LoggerService is constructed
    Then a console.warn advises that logLevel is unset
    And the message references setting logLevel explicitly for debug
