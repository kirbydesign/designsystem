import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { AccountNumber } from './account-number.model';
import { AccountNumberPipe } from './account-number.pipe';

describe('AccountNumberPipe', () => {
  let spectator: SpectatorService<AccountNumberPipe>;

  const createPipe = createServiceFactory({
    service: AccountNumberPipe,
  });

  beforeEach(() => {
    spectator = createPipe();
  });

  describe('transform', () => {
    it('should format an account number with a space', () => {
      const accountNumber: AccountNumber = {
        regNo: '1234',
        accountNo: '1234567890',
      };
      expect(spectator.service.transform(accountNumber)).toEqual('1234 1234567890');
    });

    it('should pad reg. number to 4 digits (with "0" - zeros)', () => {
      const accountNumber: AccountNumber = {
        regNo: '1',
        accountNo: '1234567890',
      };
      expect(spectator.service.transform(accountNumber)).toEqual('0001 1234567890');
    });

    it('should remove leading zeroes from account number', () => {
      const accountNumber: AccountNumber = {
        regNo: '1234',
        accountNo: '000100',
      };
      expect(spectator.service.transform(accountNumber)).toEqual('1234 100');
    });
  });
});
