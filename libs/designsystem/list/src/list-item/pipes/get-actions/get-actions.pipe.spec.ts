import { ListItem } from '../../list-item.component';
import { GetActionsPipe } from './get-actions.pipe';

describe('GetActionsPipe', () => {
  const item: ListItem = {
    id: 1,
    title: 'Cypress Semiconductor Corporation',
    subTitle: '1827 pcs',
    amount: '76.980 DKK',
    detail: -3,
    flagged: true,
    color: 'light',
  };

  let pipe: GetActionsPipe;
  let device: 'desktop' | 'mobile';

  beforeEach(() => {
    pipe = new GetActionsPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty array if swipeActions is not an array', () => {
    const swipeActions = null;
    const direction = 'left';

    expect(pipe.transform(item, [swipeActions, device, direction])).toEqual([]);
  });

  it('should return empty array if swipeActions is an empty array', () => {
    const swipeActions = [];
    const direction = 'left';

    expect(pipe.transform(item, [swipeActions, device, direction])).toEqual([]);
  });

  describe('when device is desktop', () => {
    device = 'desktop';

    it('should return array with one item if swipeActions is an array with one item', () => {
      const swipeActions = [{ position: 'left' }];
      const direction = 'left';

      expect(pipe.transform(item, [swipeActions, device, direction])).toEqual([
        { position: 'left' },
      ]);
    });

    it('should return array with two items if swipeActions is an array with two items', () => {
      const swipeActions = [{ position: 'left' }, { position: 'right' }];
      const direction = 'left';

      expect(pipe.transform(item, [swipeActions, device, direction])).toEqual([
        { position: 'left' },
        { position: 'right' },
      ]);
    });
  });

  describe('when device is mobile', () => {
    const device = 'mobile';

    it(`should return array with one item if swipeActions is an array with one 
    item and 'isDisabled' is undefined`, () => {
      const swipeActions = [{ position: 'left' }];
      const direction = 'left';

      expect(pipe.transform(item, [swipeActions, device, direction])).toEqual([
        { position: 'left' },
      ]);
    });

    it(`should return array with one item if swipeActions is an array with one 
    item and 'isDisabled' is false, and position is 'left'`, () => {
      const swipeActions = [{ position: 'left', isDisabled: false }];
      const direction = 'left';

      expect(pipe.transform(item, [swipeActions, device, direction])).toEqual([
        { position: 'left', isDisabled: false },
      ]);
    });

    it(`should return array with one item if swipeActions is an array with one 
    item and 'isDisabled' is false, and position is 'right' and 'direction' is 'right'`, () => {
      const swipeActions = [{ position: 'right', isDisabled: false }];
      const direction = 'right';

      expect(pipe.transform(item, [swipeActions, device, direction])).toEqual([
        { position: 'right', isDisabled: false },
      ]);
    });

    it(`should return array with one item if swipeActions is an array with one 
    item and 'isDisabled' is false, and position is 'right' and 'direction' is 'left'`, () => {
      const swipeActions = [{ position: 'right', isDisabled: false }];
      const direction = 'left';

      expect(pipe.transform(item, [swipeActions, device, direction])).toEqual([]);
    });

    it(`should return array with one item if swipeActions is an array with one 
    item and 'isDisabled' is false, and position is 'left' and 'direction' is 'left'`, () => {
      const swipeActions = [{ position: 'left', isDisabled: false }];
      const direction = 'left';

      expect(pipe.transform(item, [swipeActions, device, direction])).toEqual([
        { position: 'left', isDisabled: false },
      ]);
    });

    it(`should return array with 0 item if swipeActions is an array with one 
    item and 'isDisabled' is false, and position is 'left' and 'direction' is 'right'`, () => {
      const swipeActions = [{ position: 'left', isDisabled: false }];
      const direction = 'right';

      expect(pipe.transform(item, [swipeActions, device, direction])).toEqual([]);
    });
  });

  describe(`when 'isDisabled' is a function`, () => {
    it(`should return array with 0 items if 'isDisabled' has function 'isDisabledReturnsTrue'`, () => {
      const swipeActions = [{ position: 'left', isDisabled: isDisabledReturnsTrue }];
      const direction = 'left';

      expect(pipe.transform(item, [swipeActions, device, direction])).toEqual([]);
    });

    it(`should return array with 1 item if 'isDisabled' has function 'isDisabledReturnsFalse'`, () => {
      const swipeActions = [{ position: 'left', isDisabled: isDisabledReturnsFalse }];
      const direction = 'left';

      expect(pipe.transform(item, [swipeActions, device, direction])).toEqual([
        { position: 'left', isDisabled: isDisabledReturnsFalse },
      ]);
    });
  });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function isDisabledReturnsTrue(item: ListItem) {
  return true;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function isDisabledReturnsFalse(item: ListItem) {
  return false;
}
