Feature: CloudFront viewer TLS minimum is TLS 1.2 or higher
  As a security-conscious operator of the A&R Admin UI
  I want the CDN to refuse TLS 1.0 and 1.1
  So that viewer connections use a current protocol floor

  # Finding: RA CRYPTO-001 (merged with CONFIG-001) · Issue: #74
  # Assessment Expected: MinimumProtocolVersion TLSv1.2_2021 (recommended) or TLSv1.2_2019 minimum
  # Verification: static check of template.yaml; live TLS handshake is residual smoke

  @R-06.1
  Scenario: Viewer certificate does not allow TLS 1.0/1.1
    Given the CloudFront viewer certificate is defined in the SAM template
    When the template is inspected
    Then MinimumProtocolVersion is TLSv1.2_2021 or at least TLSv1.2_2019
    And it is not TLSv1
