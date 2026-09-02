Feature: Export variance status uses correct API endpoint key
  As an export reports user
  I want variance job status checks to hit the correct API route
  So that duplicate export jobs are not started unknowingly

  # Finding: RA BW-002 · Issue: #91

  @R-33.1
  Scenario: Variance branch calls export-variance endpoint
    Given the export service checks variance report status
    When ApiService.get is invoked for variance
    Then the endpoint key is export-variance not expor-variance
