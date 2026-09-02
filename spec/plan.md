# Plan — CloudFront viewer TLS 1.2+ (CRYPTO-001)

> Architecture and delivery for issue [#74](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/74) / RA CRYPTO-001.  
> Checkpoint 1 (spec) is merged. This document is **checkpoint 2**.

## Summary

Change `template.yaml` CloudFront `ViewerCertificate.MinimumProtocolVersion` from `TLSv1` to **`TLSv1.2_2021`**. Append evidence. Must change the template (infra path — not evidence-only).

## Architecture

```text
template.yaml
  AWS::CloudFront::Distribution
    ViewerCertificate.MinimumProtocolVersion: TLSv1.2_2021
```

## Key decisions

| Decision | Choice | Rationale |
| --- | --- | --- |
| Policy | `TLSv1.2_2021` | Assessment recommended |
| Tests | Static assert / grep in CI or document template inspection | No app unit test required |
| Evidence | `--append --finding CRYPTO-001` | Preserve prior receipts |

## Tasks

1. Set `MinimumProtocolVersion: TLSv1.2_2021` in `template.yaml`
2. Append `docs/pr-evidence.md` for CRYPTO-001
3. Checkpoint 3 + merge (must change template / allowed impl path)

## Approval (checkpoint 2)

| Role | Name | Date |
| --- | --- | --- |
| Architect / tech lead | | |
