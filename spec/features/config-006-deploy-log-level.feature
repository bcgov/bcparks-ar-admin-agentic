Feature: Environment-appropriate log levels in deployment pipelines
  As a security-conscious operator of the A&R Admin UI
  I want deployed environments to use restrictive default log levels
  So that verbose debug output and configuration details are not emitted in production

  # Finding: RA CONFIG-006 · Issue: #73
  # Checkpoint 1 — acceptance owned by human sign-off in spec/spec.md
  # Verification: workflow YAML inspection; env.js logLevel values per environment

  @R-16.1
  Scenario: Production deployment uses restrictive log level
    Given the LZA production deployment pipeline generates env.js
    When the logLevel value is inspected
    Then it is not LogLevel.All (0)
    And it is Warn or more restrictive

  @R-16.2
  Scenario: Test and dev deployments use appropriate log levels
    Given the LZA test and dev deployment pipelines generate env.js
    When the logLevel values are inspected
    Then production uses the most restrictive level
    And dev may use a more verbose level than production
