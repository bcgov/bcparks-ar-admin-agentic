Feature: Production certificate ARN is not hardcoded
  As a security-conscious operator of the A&R Admin UI
  I want the production certificate identifier supplied as an environment input
  So that cloud account identifiers are not committed in the deploy workflow

  # Finding: RA SECRET-001 · Issue: #67
  # Assessment Expected: DomainCertificateArn from vars.DOMAIN_CERTIFICATE_ARN; no literal ARN.
  # Verification: static workflow check; do not print the ARN in evidence
  # Residual: GitHub Environment var must be set before next prod deploy (ops)

  @R-11.1
  Scenario: Prod deploy reads DomainCertificateArn from an environment variable
    Given the LZA production deploy workflow
    When the SAM deploy parameter overrides are inspected
    Then DomainCertificateArn is set from vars.DOMAIN_CERTIFICATE_ARN
    And that parameter is not a literal ACM certificate ARN
