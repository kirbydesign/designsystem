import {
  createServiceFactory,
  mockProvider,
  SpectatorService,
  SpyObject,
} from '@ngneat/spectator/jest';

import { AmountPipe } from './amount.pipe';
import { AmountService } from './amount.service';
import { AmountServiceConfiguration } from './amount-service-formatter';

describe('AmountPipe', () => {
  let spectator: SpectatorService<AmountPipe>;
  let amountService: SpyObject<AmountService>;

  const createPipe = createServiceFactory({
    service: AmountPipe,
    providers: [mockProvider(AmountService)],
  });

  beforeEach(() => {
    spectator = createPipe();
    amountService = spectator.inject(AmountService);
  });

  it('should call amount service', () => {
    const amount = { amount: 2000.01, currencyCode: 'EUR' };
    const configuration: AmountServiceConfiguration = {
      showCurrencyCode: 'showForeignCurrency',
      currencyCodePosition: 'prefix',
    };
    spectator.service.transform(amount, configuration);
    expect(amountService.formatAmount).toHaveBeenCalledWith(amount, configuration);
  });
});
