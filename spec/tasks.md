# Tasks — SECRET-001 (active)

- [x] In `.github/workflows/lza-deploy-admin-prod.yaml`, set `DomainCertificateArn=${{ vars.DOMAIN_CERTIFICATE_ARN }}` (remove literal ACM ARN)
- [x] Append `docs/pr-evidence.md` for SECRET-001 without printing the ARN value; note ops residual to set the GitHub Environment variable
- [ ] Checkpoint 3 + merge (must change `.github/workflows/`; refuse evidence-only)
