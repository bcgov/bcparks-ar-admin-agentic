# Logging architecture

## Current behaviour

`LoggerService` emits structured JSON log entries to the browser console only.
The browser console is ephemeral: entries are not persisted when the browser
session ends.

This application has no HTTP log shipping, server-side log persistence, or
integration with a SIEM, CloudWatch RUM, Application Insights, or another log
aggregation service.

## Future server-side log shipping

`LOG_SHIPPING_ENDPOINT` is an optional runtime configuration name reserved for
a future implementation. It is not read by `LoggerService` and setting it has
no effect today.

Before implementing log shipping, the API team and product owner must approve a
dedicated authenticated backend endpoint, retention and access controls, and
the privacy review for the structured event data. The implementation should
batch only approved security events, use `ApiService`, avoid credentials and
unnecessary personal identifiers, and safely handle failed delivery without
interrupting application behaviour.
