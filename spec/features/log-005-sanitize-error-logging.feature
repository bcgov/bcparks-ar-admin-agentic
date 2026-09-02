Feature: Sanitized error logging without raw exception objects
  As a security-conscious operator of the A&R Admin UI
  I want error logs to contain message strings only
  So that stack traces and internal URLs are not exposed in DevTools

  # Finding: RA LOG-005 · Issue: #76

  @R-18.1
  Scenario: ConfigService remote config failure logs message only via LoggerService
    Given remote configuration fetch fails
    When ConfigService handles the error
    Then LoggerService.error is called with a message string
    And the raw error object is not passed to console.error

  @R-18.2
  Scenario: Bootstrap failure logs sanitized message only
    Given Angular bootstrap fails
    When the bootstrap catch handler runs
    Then only the error message is written to console
    And the full error object is not logged
