# Plan — CloudFront viewer TLS minimum (CRYPTO-001)

> Architecture and delivery approach for issue [#27](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/27) / RA CRYPTO-001 (alias CONFIG-001).  
> Checkpoint 1 (spec) is merged. This document is **checkpoint 2**.

## Summary

Change CloudFront `ViewerCertificate.MinimumProtocolVersion` from `TLSv1` to `TLSv1.2_2021` in `template.yaml`. Prove with a static assertion that `TLSv1` is not the viewer minimum. No header policy work. Live TLS handshake after deploy is residual smoke.

## Architecture

```text
template.yaml
  CloudFrontDistribution
    ViewerCertificate
      MinimumProtocolVersion: TLSv1          ← remove
      MinimumProtocolVersion: TLSv1.2_2021   ← set
```

## Key decisions

| Decision | Choice | Rationale |
| --- | --- | --- |
| Policy | `TLSv1.2_2021` | Assessment recommended; modern ciphers, TLS 1.2+ |
| File | `template.yaml` only | Matches finding |
| Headers | Unchanged | CONFIG-002/003/004 |
| Tests | Static check (grep/script or documented one-line + CI lint) | No live AWS in `yarn test-ci` |
| Duplicate | Do not file CONFIG-001 | Same defect |

## Security & privacy

- Residual: old TLS clients cannot connect (acceptable). Runtime handshake not verified in CI.

## Test approach

- Template contains `MinimumProtocolVersion: TLSv1.2_2021` (or `_2019`) and not viewer `TLSv1`
- Optional: small node/shell check in CI if easy; otherwise evidence + human review of the one-line diff is enough with existing PR Checks (template still parses)
- Update `docs/pr-evidence.md`

## Rollout

- Takes effect on next SAM/CloudFront deploy
- Human smoke after deploy: TLS 1.0 client rejected (optional)

## Approval (checkpoint 2) — **human required**

| Role | Name | Date |
| --- | --- | --- |
| Architect / tech lead | | |

> Do not add `ready-for-agent` to #27 until this plan PR is merged.
