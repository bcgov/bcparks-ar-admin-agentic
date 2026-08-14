Feature: Content-Security-Policy on CloudFront responses
  As a security-conscious operator of the A&R Admin UI
  I want browsers to only load scripts and connections we allow
  So that injected script and unexpected third-party hosts are blocked

  # Finding: RA CONFIG-002 · Issue: #41
  # Verification: static template check; post-deploy login/API header probe is residual

  Scenario: Shared policy contains a sourced Content-Security-Policy
    Given all three cache behaviors reference the shared response policy
    When that policy is inspected
    Then it sets Content-Security-Policy
    And script sources are limited to the same origin
    And connect and frame sources allow loginproxy and the attendance API hosts
    And object sources are none and frame ancestors are none
    And HSTS, CORS, and CONFIG-004 browser headers remain configured
