Feature: Token refresh failure redirects to login
  As a BC Parks staff member using the A&R Admin UI
  I want to be sent to the login page when my session cannot be refreshed
  So that I am not left in a broken authenticated-looking state

  # Finding: RA AUTH-004 · Issue: #83

  @R-25.1
  Scenario: Background token refresh failure redirects to login
    Given local mock auth is not active
    And Keycloak is enabled for the application
    And the user had an active Keycloak session
    When the access token expires and updateToken fails
    Then the application navigates to /login
