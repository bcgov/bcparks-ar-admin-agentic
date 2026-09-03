Feature: Deployment pipelines run tests before build
  As a release engineer
  I want deploy workflows to fail if unit tests fail
  So that broken main cannot reach deployed environments

  # Finding: RA TEST-005 · Issue: #100

  @R-42.1
  Scenario: Dev deploy workflow runs test-ci before build
    Given lza-deploy-admin-dev.yaml
    When deploy steps are ordered
    Then yarn test-ci runs before the build application step

  @R-42.2
  Scenario: Test and prod deploy workflows also gate on test-ci
    Given lza-deploy-admin-test and prod workflows
    When deploy steps are ordered
    Then yarn test-ci precedes build in each
