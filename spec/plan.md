# Plan — AUTH-005 require KEYCLOAK_CLIENT_ID

Remove 'nrpti-admin' fallback. Validate KEYCLOAK_CLIENT_ID before Keycloak adapter construct; reject with toast/logger error. Unit tests @R-26.x. Append evidence.
