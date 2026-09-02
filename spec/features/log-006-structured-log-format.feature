Feature: Structured JSON log format
  As a security-conscious operator of the A&R Admin UI
  I want log entries emitted as structured JSON objects
  So that logs can be parsed correlated and alerted on automatically

  # Finding: RA LOG-006 · Issue: #77

  @R-19.1
  Scenario: Log entries are JSON objects with required fields
    When LoggerService writes a log entry
    Then the output is valid JSON
    And the object includes level timestamp and message fields
    And the object includes userId sessionId and correlationId placeholders

  @R-19.2
  Scenario: Security events include securityEvent flag
    When LoggerService logs a security-relevant warning or error
    Then the JSON object has securityEvent set to true
