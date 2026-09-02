Feature: Configuration is not dumped to the browser console
  As a security-conscious operator of the A&R Admin UI
  I want runtime configuration not printed wholesale to the console
  So that endpoints and operational detail are not casually exposed in DevTools

  # Finding: RA LOG-001 · Issue: #56
  # Verification: unit tests around ConfigService init (no live backend required)

  @R-02.1
  Scenario: Config init does not console.log the configuration object
    Given the application configuration service initializes
    When configuration is loaded from the front-end env (or remote config path)
    Then the full configuration object is not written via console.log
