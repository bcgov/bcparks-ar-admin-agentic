import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ConfigService } from '../services/config.service';
import { FiscalYearLockService } from '../services/fiscal-year-lock.service';

import { LockRecordsComponent } from './lock-records.component';

describe('LockRecordsComponent', () => {
  let component: LockRecordsComponent;
  let fixture: ComponentFixture<LockRecordsComponent>;
  let fiscalYearLockService: FiscalYearLockService;

  const mockFiscalYearLockService = {
    lockUnlockFiscalYear: jasmine.createSpy('lockUnlockFiscalYear'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [LockRecordsComponent],
    imports: [BsDatepickerModule.forRoot()],
    providers: [
      ConfigService,
      provideHttpClient(withInterceptorsFromDi()),
      { provide: FiscalYearLockService, useValue: mockFiscalYearLockService },
    ]
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LockRecordsComponent);
    component = fixture.componentInstance;
    fiscalYearLockService = TestBed.inject(FiscalYearLockService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('submit() should invoke lockUnlockFiscalYear with lock parameter true', () => {
    component.form.controls['year'].setValue(['2021-04', '2022-03'], { emitEvent: false });
    component.submit();
    expect(fiscalYearLockService.lockUnlockFiscalYear).toHaveBeenCalledWith('2022', true);
  });
});
