Feature: Global Angular ErrorHandler captures unhandled errors
  As a security operator
  I want unhandled runtime errors captured by application logging
  So that security-relevant crashes are not lost to console-only output

  # Finding: RA LOG-008 · Issue: #95

  @R-37.1
  Scenario: Custom ErrorHandler is registered in AppModule
    Given the application bootstrap configuration
    When providers are inspected
    Then ErrorHandler is bound to a custom AppErrorHandler class

  @R-37.2
  Scenario: Unhandled errors are forwarded to LoggerService
    Given an uncaught application error
    When the ErrorHandler handles it
    Then LoggerService records the error without rethrowing to the user
