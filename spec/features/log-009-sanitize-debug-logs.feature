Feature: Debug logs avoid exposing internal identifiers
  As a security-conscious operator
  I want debug logging to use generic event labels
  So that authenticated users with DevTools cannot harvest internal IDs

  # Finding: RA LOG-009 · Issue: #96

  @R-38.1
  Scenario: Activity service debug does not log raw ORCS or sub-area IDs
    Given a subarea fetch operation
    When debug logging occurs
    Then the message does not contain interpolated system identifiers

  @R-38.2
  Scenario: Fiscal year lock debug avoids exposing internal IDs
    Given a fiscal year lock operation
    When debug logging occurs
    Then identifiers are not included in the default debug message
