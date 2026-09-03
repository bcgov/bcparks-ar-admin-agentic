Feature: API query strings encode parameter values
  As a security-conscious developer
  I want query parameter values URL-encoded
  So that special characters cannot corrupt query structure

  # Finding: RA VULN-002 · Issue: #102

  @R-44.1
  Scenario: generateQueryString encodes ampersand in values
    Given a query parameter value containing special characters
    When generateQueryString builds the query
    Then values are encoded with encodeURIComponent

  @R-44.2
  Scenario: Existing numeric parameters still produce valid queries
    Given typical numeric and enum parameters
    When generateQueryString is called
    Then the resulting query string is valid for the API client
