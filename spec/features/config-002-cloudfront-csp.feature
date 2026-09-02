Feature: Content-Security-Policy on CloudFront responses
  As a security-conscious operator of the A&R Admin UI
  I want browsers to only load scripts and connections we allow
  So that injected script and unexpected third-party hosts are blocked

  # Finding: RA CONFIG-002 · Issue: #63
  # Assessment: CSP on all cache behaviours; allowlist loginproxy; no silent narrowing.
  # Scope: ContentSecurityPolicy on the shared custom response headers policy.
  # Preserve HSTS, CORS, and CONFIG-004 browser headers. Verification: static template; live smoke residual.

  @R-09.1
  Scenario: Shared policy contains a sourced Content-Security-Policy
    Given all three cache behaviours reference the shared response headers policy
    When that policy is inspected
    Then it sets Content-Security-Policy
    And script sources are limited to the same origin
    And connect and frame sources allow loginproxy and the attendance API hosts
    And object sources are none and frame ancestors are none
    And HSTS, CORS, and CONFIG-004 browser headers remain configured
