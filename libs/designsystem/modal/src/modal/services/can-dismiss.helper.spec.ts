import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { AlertConfig } from '../alert';
import { CanDismissHelper } from './can-dismiss.helper';
import { AlertHelper } from './alert.helper';

describe('CanDismissHelper', () => {
  let spectator: SpectatorService<CanDismissHelper>;

  const createService = createServiceFactory({
    service: CanDismissHelper,
    mocks: [AlertHelper],
  });

  beforeEach(() => {
    spectator = createService();
  });

  describe('getCanDismissCallback', () => {
    it('should return an async function that returns true, if the provided callback return true', async () => {
      const callback = () => true;

      const canDismissCallback = spectator.service.getCanDismissCallback(callback);
      const result = await canDismissCallback();

      expect(result).toBe(true);
    });

    it('should call the showAlert method, if the provided callback return an AlertConfig', async () => {
      const showAlertSpy = spyOn(spectator.service, 'showAlert');
      const alertConfig: AlertConfig = { title: 'Test alert' };
      const callback = () => alertConfig;

      const canDismissCallback = spectator.service.getCanDismissCallback(callback);
      await canDismissCallback();

      expect(showAlertSpy).toHaveBeenCalledTimes(1);
      expect(showAlertSpy).toHaveBeenCalledWith(alertConfig);
    });
  });
});
