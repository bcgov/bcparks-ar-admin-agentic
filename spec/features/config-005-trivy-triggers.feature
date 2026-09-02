Feature: Trivy security scan runs on automatic CI triggers
  As a security-conscious operator of the A&R Admin UI pipeline
  I want the Trivy repository scan to run on push, pull requests, and schedule
  So that vulnerabilities, secrets, and IaC misconfigurations are caught before deploy

  # Finding: RA CONFIG-005 · Issue: #72
  # Verification: workflow YAML inspection; Trivy job runs on PR in CI

  @R-15.1
  Scenario: Analysis workflow has automatic triggers enabled
    Given the repository security scan workflow exists
    When its trigger configuration is inspected
    Then push to main is an active trigger
    And pull_request is an active trigger
    And a weekly scheduled cron trigger is active

  @R-15.2
  Scenario: Trivy scan covers vuln secret and config scanners
    Given the Trivy security scan job is defined
    When its configuration is inspected
    Then scanners include vulnerabilities secrets and config
