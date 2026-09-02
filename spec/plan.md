# Plan — VULN-001 Historical pill XSS

> Checkpoint 2 for issue [#82](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/82).

## Approach

1. getHighlightedMatch returns plain text segments (no HTML wrappers).
2. Replace [innerHtml] with text interpolation; keep highlight class on middle span.
3. Unit tests for malicious input; append evidence.
