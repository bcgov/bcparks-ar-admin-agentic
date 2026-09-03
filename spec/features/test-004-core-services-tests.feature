Feature: Core shared services have unit test coverage
  As a developer
  I want tests on the reactive state bus and fetch orchestration
  So that regressions in widely consumed services are caught in CI

  # Finding: RA TEST-004 · Issue: #99

  @R-41.1
  Scenario: DataService spec covers setItemValue and watchItem
    Given the DataService test suite
    When BehaviourSubject streams are exercised
    Then setItemValue and watchItem behave as expected

  @R-41.2
  Scenario: AutoFetchService has unit tests
    Given the AutoFetchService test suite
    When fetch orchestration is triggered
    Then expected side effects are verified
