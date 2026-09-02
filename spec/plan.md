# Plan — SECRET-002 non-prod AWS account IDs

> Checkpoint 2 for issue [#79](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/79).

## Approach

1. Dev/test LZA workflows: DomainCertificateArn from `${{ vars.DOMAIN_CERTIFICATE_ARN }}`.
2. template.yaml: remove DomainCertificateArn Default containing account ID.
3. vars.json: remove committed DomainCertificateArn if present.
4. Setup scripts: require AWS_ACCOUNT_ID / AWS_PROFILE_LZA / related env vars — no literal account IDs.
5. Append evidence.

## Risk

Deploy fails until vars set per env (same as SECRET-001).
