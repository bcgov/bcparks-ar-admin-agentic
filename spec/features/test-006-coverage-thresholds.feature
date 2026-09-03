Feature: CI fails when coverage drops below thresholds
  As a tech lead
  I want coverage thresholds enforced in CI
  So that test coverage cannot silently degrade

  # Finding: RA TEST-006 · Issue: #101

  @R-43.1
  Scenario: angular.json defines coverageThresholds
    Given the Angular test configuration
    When coverage settings are read
    Then coverageThresholds block is present with statement/branch/line minimums

  @R-43.2
  Scenario: karma produces lcov output for trend tracking
    Given karma coverage reporter configuration
    When reporters are listed
    Then lcovonly or html reporter is included alongside text
