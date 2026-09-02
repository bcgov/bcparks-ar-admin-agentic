Feature: isAdmin uses centralized admin role constant
  As a maintainer of BC Parks admin authorization
  I want isAdmin() to reference the shared ApplicationRoles.ADMIN constant
  So that a role rename in one place does not silently break admin checks

  # Finding: RA AUTHZ-004 · Issue: #88

  @R-30.1
  Scenario: isAdmin returns true when token includes the configured admin role
    Given the user token includes the ApplicationRoles.ADMIN role
    When isAdmin is evaluated
    Then the result is true

  @R-30.2
  Scenario: isAdmin does not compare against a hardcoded role string literal
    Given the ApplicationRoles.ADMIN constant defines the admin role name
    When isAdmin checks the user token roles
    Then it uses ApplicationRoles.ADMIN not a duplicated string literal
