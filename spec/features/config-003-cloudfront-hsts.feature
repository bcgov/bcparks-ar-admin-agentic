Feature: CloudFront sends HSTS on all cache behaviours
  As a security-conscious operator of the A&R Admin UI
  I want browsers to remember HTTPS is required
  So that SSL-stripping is harder after the first visit

  # Finding: RA CONFIG-003 · Issue: #32
  # Checkpoint 1 — acceptance owned by human sign-off in spec/spec.md
  # Verification: static inspection of template.yaml; live headers are residual smoke

  Scenario: Custom policy sets Strict-Transport-Security
    Given the CloudFront distribution is defined in the SAM template
    When the template is inspected
    Then a custom response headers policy sets Strict-Transport-Security
    And all three cache behaviours reference that policy
    And CORS equivalent to the previous SimpleCORS policy is still declared
