Feature: Historical pill typeahead is safe from stored XSS
  As a security-conscious operator of the A&R Admin UI
  I want sub-area name highlighting to avoid unsafe innerHtml binding
  So that malicious database values cannot execute script in the typeahead

  # Finding: RA VULN-001 · Issue: #82

  @R-24.1
  Scenario: Highlight segments use text binding not innerHtml
    Given the historical pill typeahead template
    When match highlighting is rendered
    Then innerHtml bindings are not used for user-supplied sub-area names
    And highlight segments are bound as plain text

  @R-24.2
  Scenario: Malicious sub-area name is displayed as text not executed
    Given a sub-area name containing HTML script markup
    When getHighlightedMatch builds highlight segments
    Then the returned segments contain the literal text unchanged
    And no HTML tags from the input are emitted for binding
