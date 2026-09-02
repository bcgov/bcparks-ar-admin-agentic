Feature: Date handling consolidated on luxon
  As a maintainer
  I want a single date library in the codebase
  So that maintenance-mode moment is not bundled alongside luxon

  # Finding: RA DEP-003 · Issue: #94

  @R-36.1
  Scenario: moment is not imported in application source
    Given the TypeScript source tree
    When imports are searched
    Then no file imports from moment

  @R-36.2
  Scenario: Former moment call sites use luxon
    Given activity and utility date formatting
    When dates are formatted or parsed
    Then luxon APIs are used
