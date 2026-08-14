# Plan — Production certificate environment input (SECRET-001)

> Architecture and delivery approach for issue [#46](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/46) / RA SECRET-001.  
> Checkpoint 1 (spec) is merged. This document is **checkpoint 2**.

## Summary

Replace the hardcoded `DomainCertificateArn` on the LZA **prod** deploy workflow with `${{ vars.DOMAIN_CERTIFICATE_ARN }}`. Do not reprint the current ARN in evidence or comments. **Do not merge the implementation** until a human has created GitHub Environment `lza-prod` and set that variable — the environment currently 404s via API, so a merge would break prod deploy.

## Architecture

```text
.github/workflows/lza-deploy-admin-prod.yaml
  jobs.deploy.environment: lza-prod          ← already set
  SAM --parameter-overrides
    DomainCertificateArn="${{ vars.DOMAIN_CERTIFICATE_ARN }}"  ← new
```

`vars.*` is scoped to the job `environment`. Until `lza-prod` exists and `DOMAIN_CERTIFICATE_ARN` is set, the expression is empty at runtime.

## Key decisions

| Decision | Choice | Rationale |
| --- | --- | --- |
| Scope | Prod workflow only | Finding is SECRET-001; dev/test ARNs are SECRET-002 |
| Source | `${{ vars.DOMAIN_CERTIFICATE_ARN }}` | Signed spec; GitHub Environment variable, not a repo secret (ARN is an identifier, but still must leave the file) |
| Evidence | Assert `vars.DOMAIN_CERTIFICATE_ARN` present and no literal `arn:aws:acm:` on that override | Do not paste the old value |
| Merge | **Pause before CP3 merge** | `lza-prod` is not configured (API 404). Human must create the environment and variable |
| Draft impl | Allowed | Copilot may open a draft PR; leave draft until the env exists |

## Security & privacy

- Residual: the historical ARN remains in git history after the file change. Rotation/history rewrite is out of scope.
- Residual: deploy stays broken until the env var is set — that is why we pause merge.
- Do not put the ARN in `docs/pr-evidence.md`, review comments, or commit messages.

## Test approach

- Static: prod workflow `DomainCertificateArn=` uses `vars.DOMAIN_CERTIFICATE_ARN`; that override line is not a literal ACM ARN
- Update `docs/pr-evidence.md` without the identifier
- No application tests

## Rollout

1. Human: create GitHub Environment `lza-prod` (if missing) and set variable `DOMAIN_CERTIFICATE_ARN` to the existing ACM certificate ARN.
2. Then merge the implementation PR.
3. Next tagged prod deploy should pass the parameter from the environment.

## Approval (checkpoint 2) — **human required**

| Role | Name | Date |
| --- | --- | --- |
| Architect / tech lead | | |
