# Plan — Admin-only export/review routes (AUTHZ-002)

> Issue [#71](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/71) / RA AUTHZ-002. Checkpoint 2.

## Summary

Add `export-reports` and `review-data` to `KeycloakService.isAllowed()` admin-only list. Unit-test isAllowed denials/grants and AuthGuard redirects. Must change `src/`.

## Tasks

1. Extend adminOnlyRoutes; tests for isAllowed
2. Ensure AuthGuard redirect coverage for both paths
3. Append evidence; CP3 merge

## Approval (checkpoint 2)

| Role | Name | Date |
| --- | --- | --- |
| Architect / tech lead | | |
