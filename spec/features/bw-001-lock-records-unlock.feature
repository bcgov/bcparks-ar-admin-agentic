Feature: Lock Records supports unlock workflow
  As an admin operator
  I want to unlock a previously locked fiscal year
  So that corrections can be made without a backend-only workaround

  # Finding: RA BW-001 · Issue: #90

  @R-32.1
  Scenario: Unlock invokes lockUnlockFiscalYear with lock false
    Given a fiscal year is selected
    When the admin chooses Unlock
    Then lockUnlockFiscalYear is called with lock parameter false

  @R-32.2
  Scenario: Lock still invokes lockUnlockFiscalYear with lock true
    Given a fiscal year is selected
    When the admin chooses Lock
    Then lockUnlockFiscalYear is called with lock parameter true
