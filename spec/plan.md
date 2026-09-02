# Plan — SECRET-003 Route53 zone ID

> Checkpoint 2 for issue [#80](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/80).

## Approach

1. Remove hardcoded ROUTE53_ZONE_ID from pre-migration-certificate-setup.sh.
2. Resolve via env var or `aws route53 list-hosted-zones-by-name --dns-name bcparks.ca`.
3. Document env vars in script header; append evidence.
