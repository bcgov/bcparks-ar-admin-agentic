# Spec — BC Parks Attendance & Revenue (Admin)

> Technology-free. Describe *what* and *why*, not frameworks or cloud products.
> Living document: one **active** slice for checkpoint 1; completed slices summarised below.

---

## Active slice

### LOG-001 — Do not dump full configuration to the browser console

- **Issue:** [#56](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/56)
- **Finding:** Rapid assessment `ra-2026-07-21T171227Z` · `LOG-001`
- **Feature:** `features/log-001-no-config-console-dump.feature`

#### Problem

On startup the admin UI writes the full runtime configuration object to the browser console. That can expose environment endpoints and other operational detail to anyone with DevTools on a shared or shoulder-surfed workstation.

#### Outcome

The full configuration object is **not** written to `console.log` (or equivalent console dump) during normal config initialization. Staff can still use the app; operators rely on intentional, redacted logging if needed later.

#### Users & personas

| Persona | Goal |
| --- | --- |
| Parks staff | Use the app without leaking ops config via the console |
| Security reviewer | Confirm config dump is gone from the init path |

#### Scope

**In scope**

- Remove or replace the configuration console dump in the config initialization path
- Automated proof that the dump no longer occurs (unit test)

**Out of scope**

- Broader logging framework redesign (other LOG-* findings)
- Changing where config is loaded from

#### Open questions

- None blocking.

#### Sign-off (checkpoint 1)

| Role | Name | Date |
| --- | --- | --- |
| Product / PM | | |
| BA | | |
| QA (acceptance ownership) | | |

---

## Completed slices

### AUTHZ-001 — Admin route guard path matching

- **Issue:** [#55](https://github.com/bcgov/bcparks-ar-admin-agentic/issues/55) (shipped)
- **Feature:** `features/authz-001-admin-route-guard.feature`
