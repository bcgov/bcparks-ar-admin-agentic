import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ConfigService } from './config.service';

import { FiscalYearLockService } from './fiscal-year-lock.service';
import { BehaviorSubject } from 'rxjs';

describe('FiscalYearLockService', () => {
  let service: FiscalYearLockService;
  let loggerServiceDebugSpy;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [ConfigService, provideHttpClient(withInterceptorsFromDi())]
});
    service = TestBed.inject(FiscalYearLockService);
    loggerServiceDebugSpy = spyOn(service['loggerService'], 'debug');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('does not include the fiscal year in debug messages', async () => {
    spyOn(service['apiService'], 'get').and.returnValue(new BehaviorSubject([]));

    await service.fetchFiscalYear(2025);

    expect(loggerServiceDebugSpy).toHaveBeenCalledWith('Fiscal year end GET');
    expect(loggerServiceDebugSpy.calls.mostRecent().args[0]).not.toContain('2025');
  });

  it('does not include the fiscal year in lock debug messages', async () => {
    spyOn(service['apiService'], 'post').and.returnValue(new BehaviorSubject({}));
    spyOn(service, 'fetchFiscalYear').and.resolveTo([]);

    await service.lockUnlockFiscalYear(2025, true);

    expect(loggerServiceDebugSpy).toHaveBeenCalledWith('Fiscal year end POST');
    expect(loggerServiceDebugSpy.calls.mostRecent().args[0]).not.toContain('2025');
  });
});
