Feature: Unused chart.js dependency removed
  As a security-conscious maintainer
  I want unused runtime dependencies removed
  So that vulnerability advisories do not flag dead code paths

  # Finding: RA DEP-001 · Issue: #92

  @R-34.1
  Scenario: chart.js is not listed in package.json dependencies
    Given the application package manifest
    When dependencies are inspected
    Then chart.js is not present
