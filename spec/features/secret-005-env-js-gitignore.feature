Feature: Runtime env.js is not committed to version control
  As a maintainer
  I want only env.js.template in git
  So that development runtime config is not accidentally overwritten in production

  # Finding: RA SECRET-005 · Issue: #98

  @R-40.1
  Scenario: src/env.js is listed in gitignore
    Given repository ignore rules
    When gitignore is read
    Then src/env.js is ignored

  @R-40.2
  Scenario: env.js.template remains tracked for local generation
    Given the source tree
    When templates are listed
    Then env.js.template is present for developers to copy
