Feature: CloudFront sends browser security headers
  As a security-conscious operator of the A&R Admin UI
  I want framing, MIME sniffing, referrers, and powerful APIs constrained
  So that clickjacking and related browser abuse are harder

  # Finding: RA CONFIG-004 · Issue: #36
  # Verification: static inspection of template.yaml; live headers are residual smoke

  Scenario: Custom policy sets frame, nosniff, referrer, and permissions headers
    Given the custom CloudFront response headers policy exists
    When the template is inspected
    Then it sets X-Frame-Options or equivalent frame options
    And it sets X-Content-Type-Options nosniff
    And it sets Referrer-Policy
    And it sets Permissions-Policy
    And Strict-Transport-Security from CONFIG-003 is still present
    And Content-Security-Policy is not added in this slice
