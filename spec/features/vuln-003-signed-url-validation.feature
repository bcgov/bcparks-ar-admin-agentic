Feature: Export download validates signed URL scheme
  As an export reports user
  I want download links restricted to safe HTTPS URLs
  So that tampered API responses cannot open dangerous schemes

  # Finding: RA VULN-003 · Issue: #103

  @R-45.1
  Scenario: downloadReport rejects non-https signed URLs
    Given a signedURL that is not https
    When download is attempted
    Then window.open is not called

  @R-45.2
  Scenario: downloadReport opens valid https signed URLs
    Given a signedURL starting with https
    When download is attempted
    Then window.open is called with the URL
