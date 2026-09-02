# End-to-end testing

Run the Playwright smoke test with:

```sh
yarn e2e
```

The command starts the Angular development server unless one is already
running locally. Install the Chromium browser once before the first run:

```sh
yarn playwright install chromium
```

## Planned auth-boundary coverage

Full Keycloak OIDC automation requires a dedicated test realm and synthetic
accounts, so it is deferred. When that environment is available, add tests
that verify:

- unauthenticated requests to guarded routes redirect to `/login`;
- authenticated users without any application role redirect to `/unauthorized`;
- authenticated non-`sysadmin` users cannot access `/export-reports`,
  `/lock-records`, or `/manage-subareas`.
