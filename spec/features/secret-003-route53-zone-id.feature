Feature: Route53 hosted zone ID is not hardcoded
  As a security-conscious operator of the A&R Admin UI
  I want the Route53 zone identifier supplied via environment variable or dynamic lookup
  So that DNS infrastructure identifiers are not committed in migration scripts

  # Finding: RA SECRET-003 · Issue: #80

  @R-22.1
  Scenario: Pre-migration script does not hardcode Route53 zone ID
    Given the pre-migration certificate setup script
    When Route53 zone configuration is inspected
    Then no literal hosted zone ID is hardcoded in the script
    And zone ID is resolved from ROUTE53_ZONE_ID or AWS lookup

  @R-22.2
  Scenario: Dynamic lookup resolves bcparks.ca zone when env var unset
    Given ROUTE53_ZONE_ID is not set
    When the script resolves the hosted zone for bcparks.ca
    Then it uses aws route53 list-hosted-zones-by-name
    And the zone ID is normalized without the hostedzone prefix
