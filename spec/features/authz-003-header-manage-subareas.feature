Feature: Header hides admin-only navigation for non-admin users
  As a non-admin BC Parks staff member
  I should not see manage-subareas in the header navigation
  So that I am not invited to routes I cannot access

  # Finding: RA AUTHZ-003 · Issue: #87

  @R-29.1
  Scenario: manage-subareas nav link hidden for non-admin users
    Given the user is authenticated but not an admin
    When the header builds its navigation routes
    Then manage-subareas is not included in the visible routes

  @R-29.2
  Scenario: manage-subareas nav link shown for admin users
    Given the user is an admin
    When the header builds its navigation routes
    Then manage-subareas is included in the visible routes
