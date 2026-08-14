Feature: Production certificate ARN is not hardcoded
  As a security-conscious operator of the A&R Admin UI
  I want the production certificate identifier supplied as an environment input
  So that cloud account identifiers are not committed in the deploy workflow

  # Finding: RA SECRET-001 · Issue: #46
  # Verification: static workflow check; do not print the ARN in evidence
  # Pause: do not merge until lza-prod vars.DOMAIN_CERTIFICATE_ARN exists

  Scenario: Prod deploy reads DomainCertificateArn from an environment variable
    Given the LZA production deploy workflow
    When the SAM deploy parameter overrides are inspected
    Then DomainCertificateArn is set from vars.DOMAIN_CERTIFICATE_ARN
    And that parameter is not a literal ACM certificate ARN
