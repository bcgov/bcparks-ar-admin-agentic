Feature: Browser security headers on CloudFront responses
  As a security-conscious operator of the A&R Admin UI
  I want baseline browser protections on every response
  So that framing, MIME sniffing, referrer leakage, and unused capabilities are constrained

  # Finding: RA CONFIG-004 · Issue: #104
  # Assessment: add X-Frame-Options, X-Content-Type-Options: nosniff, Referrer-Policy,
  # and Permissions-Policy on all cache behaviours (custom policy; not managed SimpleCORS alone).
  # Scope this slice: those four headers on the existing custom response headers policy.
  # Do not add or change CSP here (CONFIG-002). Keep HSTS + CORS from CONFIG-003.
  # Verification: static inspection of template.yaml; live headers residual smoke

  @R-08.1
  Scenario: Shared policy contains baseline browser protections
    Given all three cache behaviours reference the shared response headers policy
    When that policy is inspected
    Then frame options deny framing (X-Frame-Options DENY)
    And content type options enable nosniff
    And referrer policy is strict-origin-when-cross-origin
    And permissions policy disables unused browser capabilities
    And HSTS and CORS remain configured
    And Content-Security-Policy is not required by this slice
