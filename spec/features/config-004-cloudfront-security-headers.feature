Feature: Browser security headers on CloudFront responses
  As a security-conscious operator of the A&R Admin UI
  I want baseline browser protections on every response
  So that framing, MIME sniffing, referrer leakage, and unused capabilities are constrained

  # Finding: RA CONFIG-004 · Issue: #36
  # Verification: static template check; post-deploy header probe is residual

  Scenario: Shared policy contains baseline browser protections
    Given all three cache behaviors reference the shared response policy
    When that policy is inspected
    Then frame options deny framing
    And content type options enable nosniff
    And referrer policy is strict-origin-when-cross-origin
    And permissions policy disables unused browser capabilities
    And HSTS and CORS remain configured
