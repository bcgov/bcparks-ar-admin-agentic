Feature: Non-production AWS account identifiers are not hardcoded
  As a security-conscious operator of the A&R Admin UI
  I want non-prod AWS account IDs supplied via CI/CD variables and script env vars
  So that infrastructure identifiers are not committed in source files

  # Finding: RA SECRET-002 · Issue: #79

  @R-21.1
  Scenario: Dev deploy reads DomainCertificateArn from an environment variable
    Given the LZA dev deploy workflow
    When the SAM deploy parameter overrides are inspected
    Then DomainCertificateArn is set from vars.DOMAIN_CERTIFICATE_ARN
    And that parameter is not a literal ACM certificate ARN

  @R-21.2
  Scenario: Test deploy reads DomainCertificateArn from an environment variable
    Given the LZA test deploy workflow
    When the SAM deploy parameter overrides are inspected
    Then DomainCertificateArn is set from vars.DOMAIN_CERTIFICATE_ARN
    And that parameter is not a literal ACM certificate ARN

  @R-21.3
  Scenario: SAM template does not default DomainCertificateArn to a committed ARN
    Given the SAM template DomainCertificateArn parameter
    When its Default value is inspected
    Then no Default value containing an AWS account ID is present

  @R-21.4
  Scenario: Setup scripts require account ID via environment variable
    Given the LZA dev environment setup script
    When AWS account configuration is inspected
    Then the account ID is read from AWS_ACCOUNT_ID or AWS_PROFILE_LZA env vars
    And no literal non-production AWS account ID is hardcoded
