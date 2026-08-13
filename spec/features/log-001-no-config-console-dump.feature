Feature: Do not dump full configuration to the browser console
  As a security-conscious operator of the A&R Admin UI
  I want runtime configuration not printed in full to DevTools
  So that API and identity-broker details are not leaked on verbose log levels

  # Finding: RA LOG-001 · Issue: #19
  # Checkpoint 1 — acceptance owned by human sign-off in spec/spec.md
  # Verification: unit tests on ConfigService (console spy); no live IdP required

  Scenario: Verbose log level does not dump full config
    Given application configuration has loaded
    And logLevel is All (0)
    When ConfigService initialises
    Then the full configuration object is not written to the browser console

  Scenario: Other log levels also do not dump full config
    Given application configuration has loaded
    And logLevel is not All
    When ConfigService initialises
    Then there is still no full configuration console dump
