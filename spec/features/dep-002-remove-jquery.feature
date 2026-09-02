Feature: Unused jQuery removed from global scripts
  As a security-conscious maintainer
  I want jQuery removed from the browser bundle
  So that unnecessary DOM attack surface is eliminated

  # Finding: RA DEP-002 · Issue: #93

  @R-35.1
  Scenario: jquery is not loaded as a global script
    Given the Angular build configuration
    When global scripts are inspected
    Then jquery is not included

  @R-35.2
  Scenario: jquery is not a runtime dependency
    Given package.json
    When dependencies are listed
    Then jquery is not present
