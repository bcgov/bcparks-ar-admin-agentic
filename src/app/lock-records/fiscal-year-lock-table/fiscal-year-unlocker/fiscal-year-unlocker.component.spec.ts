import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigService } from 'src/app/services/config.service';
import { FiscalYearLockService } from 'src/app/services/fiscal-year-lock.service';

import { FiscalYearUnlockerComponent } from './fiscal-year-unlocker.component';

describe('FiscalYearUnlockerComponent', () => {
  let component: FiscalYearUnlockerComponent;
  let fixture: ComponentFixture<FiscalYearUnlockerComponent>;
  let fiscalYearLockService: FiscalYearLockService;

  const mockFiscalYearLockService = {
    lockUnlockFiscalYear: jasmine.createSpy('lockUnlockFiscalYear'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [FiscalYearUnlockerComponent],
    imports: [],
    providers: [
      ConfigService,
      provideHttpClient(withInterceptorsFromDi()),
      { provide: FiscalYearLockService, useValue: mockFiscalYearLockService },
    ]
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiscalYearUnlockerComponent);
    component = fixture.componentInstance;
    fiscalYearLockService = TestBed.inject(FiscalYearLockService);
    component.data = { year: { value: '2022' } };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('unlockFiscalYear() should invoke lockUnlockFiscalYear with lock parameter false', () => {
    component.unlockFiscalYear();
    expect(fiscalYearLockService.lockUnlockFiscalYear).toHaveBeenCalledWith('2022', false);
  });
});
