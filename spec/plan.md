# Plan — Prod certificate ARN from vars (SECRET-001)

> Architecture and delivery for issue [#67](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/67) / RA SECRET-001.  
> Checkpoint 1 (spec) is merged. This document is **checkpoint 2**.

## Summary

In `.github/workflows/lza-deploy-admin-prod.yaml`, replace the hardcoded `DomainCertificateArn="arn:aws:acm:..."` parameter override with `DomainCertificateArn=${{ vars.DOMAIN_CERTIFICATE_ARN }}`. Must change `.github/workflows/`. Do not print the ARN in evidence. Document ops residual: set the GitHub Environment variable before the next prod deploy.

## Architecture

```text
lza-deploy-admin-prod.yaml
  SAM Deploy --parameter-overrides
    DomainCertificateArn=${{ vars.DOMAIN_CERTIFICATE_ARN }}
GitHub Environment (prod / lza-prod)
  vars.DOMAIN_CERTIFICATE_ARN  (human-set residual)
```

## Key decisions

| Decision | Choice | Rationale |
| --- | --- | --- |
| Source | `vars.DOMAIN_CERTIFICATE_ARN` | Matches assessment Expected |
| Evidence | No ARN reprint | Avoid re-leaking |
| Ops var | Residual, not blocking code merge | Code fix is complete when workflow references vars |

## Tasks

1. Replace literal DomainCertificateArn in prod LZA workflow with vars reference
2. Append evidence (no ARN value)
3. Checkpoint 3 + merge (must change `.github/workflows/`)

## Approval (checkpoint 2)

| Role | Name | Date |
| --- | --- | --- |
| Architect / tech lead | | |
