import { Constants } from '../shared/utils/constants';
import { AutoFetchService } from './auto-fetch.service';
import { LoggerService } from './logger.service';
import { ParkService } from './park.service';

describe('AutoFetchService', () => {
  let service: AutoFetchService;
  let parkService: jasmine.SpyObj<ParkService>;
  let loggerService: jasmine.SpyObj<LoggerService>;

  beforeEach(() => {
    parkService = jasmine.createSpyObj('ParkService', ['fetchEnterDataPark']);
    loggerService = jasmine.createSpyObj('LoggerService', ['debug']);
    service = new AutoFetchService(parkService, loggerService);
  });

  it('fetches enter-data parks from its queue', () => {
    service.runFetches([Constants.dataIds.ENTER_DATA_PARK]);

    expect(parkService.fetchEnterDataPark).toHaveBeenCalledTimes(1);
  });

  it('ignores fetch IDs without an associated fetch operation', () => {
    service.runFetches(['unknown-fetch']);

    expect(parkService.fetchEnterDataPark).not.toHaveBeenCalled();
  });

  it('runs queued fetches immediately and on its configured interval', async () => {
    jasmine.clock().install();

    try {
      await service.run();
      jasmine.clock().tick(service.timeIntevalSeconds * 1000);

      expect(parkService.fetchEnterDataPark).toHaveBeenCalledTimes(2);
      expect(loggerService.debug).toHaveBeenCalledWith(
        `runFetches ${service.fetchQueue}`
      );
    } finally {
      jasmine.clock().uninstall();
    }
  });
});
