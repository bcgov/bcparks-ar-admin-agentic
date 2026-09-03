Feature: API Gateway ID not committed in infrastructure defaults
  As a security-conscious deployer
  I want API Gateway IDs supplied at deploy time only
  So that development instance IDs are not probeable from the repo

  # Finding: RA SECRET-004 · Issue: #97

  @R-39.1
  Scenario: template.yaml has no Default for ApiGatewayId
    Given the SAM template parameters
    When ApiGatewayId is defined
    Then no Default value is committed

  @R-39.2
  Scenario: vars.json does not contain ApiGatewayId
    Given deployment vars configuration
    When vars.json is inspected
    Then ApiGatewayId is absent
