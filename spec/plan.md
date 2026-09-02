# Plan — Enable Trivy automatic triggers (CONFIG-005)

> Issue [#72](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/72) / RA CONFIG-005. Checkpoint 2.

## Summary

Uncomment push (main), pull_request, and weekly schedule triggers in `.github/workflows/analysis.yaml`. Keep workflow_dispatch and existing Trivy scanners. Must change `.github/workflows/`.

## Tasks

1. Enable automatic triggers in analysis.yaml
2. Append evidence; CP3 merge

## Approval (checkpoint 2)

| Role | Name | Date |
| --- | --- | --- |
| Architect / tech lead | | |
