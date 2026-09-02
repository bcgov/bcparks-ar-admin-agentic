Feature: CloudFront sends HSTS on all cache behaviours
  As a security-conscious operator of the A&R Admin UI
  I want browsers to remember HTTPS is required
  So that SSL-stripping is harder after the first visit

  # Finding: RA CONFIG-003 · Issue: #64
  # Assessment: add Strict-Transport-Security on all cache behaviours (enable preload readiness)
  # Scope this slice: HSTS + preserve CORS equivalent to managed SimpleCORS.
  # Do not add CSP / XFO / Referrer / Permissions here (CONFIG-002 / CONFIG-004).
  # Verification: static inspection of template.yaml; live headers residual smoke

  @R-07.1
  Scenario: Custom policy sets Strict-Transport-Security
    Given the CloudFront distribution is defined in the SAM template
    When the template is inspected
    Then a custom response headers policy sets Strict-Transport-Security
    And max-age is at least one year (31536000 seconds)
    And includeSubDomains is enabled
    And all three cache behaviours reference that policy
    And CORS equivalent to the previous SimpleCORS policy is still declared
