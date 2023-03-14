import { ListItem } from '../../list-item.component';
import { HasActionsPipe } from './has-actions.pipe';

describe('HasActionsPipe', () => {
  let pipe: HasActionsPipe;

  const item: ListItem = {
    id: 0,
    title: 'Vestas Wind Systems',
    subTitle: '2000 pcs',
    amount: '5.587.218.309 DKK',
    detail: 225,
    flagged: false,
    color: 'default',
  };

  beforeEach(() => {
    pipe = new HasActionsPipe();
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return false if swipeActions is not an array', () => {
    const swipeActions = null;
    const device = 'desktop';

    expect(pipe.transform(item, [swipeActions, device])).toBe(false);
  });

  it('should return false if swipeActions is an empty array', () => {
    const swipeActions = [];
    const device = 'desktop';

    expect(pipe.transform(item, [swipeActions, device])).toBe(false);
  });

  it('should return true if swipeActions is an array with one item', () => {
    const swipeActions = [{ position: 'left' }];
    const device = 'desktop';

    expect(pipe.transform(item, [swipeActions, device])).toBe(true);
  });

  it('should return true if swipeActions is an array with two items', () => {
    const swipeActions = [{ position: 'left' }, { position: 'right' }];
    const device = 'desktop';

    expect(pipe.transform(item, [swipeActions, device])).toBe(true);
  });

  it('should return true if swipeActions is an array with one item and device is mobile', () => {
    const swipeActions = [{ position: 'left' }];
    const device = 'mobile';

    expect(pipe.transform(item, [swipeActions, device])).toBe(true);
  });

  it('should return true if swipeActions is an array with two items and device is mobile', () => {
    const swipeActions = [{ position: 'left' }, { position: 'right' }];
    const device = 'mobile';

    expect(pipe.transform(item, [swipeActions, device])).toBe(true);
  });

  it('should return false if swipeAction isDisabled is function which returns true', () => {
    const swipeActions = [{ position: 'left', isDisabled: isDisabledReturnsTrue }];
    const device = null;

    expect(pipe.transform(item, [swipeActions, device])).toBe(false);
  });

  it('should return true if swipeAction isDisabled is function which returns false', () => {
    const swipeActions = [{ position: 'left', isDisabled: isDisabledReturnsFalse }];
    const device = null;

    expect(pipe.transform(item, [swipeActions, device])).toBe(true);
  });

  it('should return false if swipeAction isDisabled is true', () => {
    const swipeActions = [{ position: 'left', isDisabled: true }];
    const device = null;

    expect(pipe.transform(item, [swipeActions, device])).toBe(false);
  });

  it('should return true if swipeAction isDisabled is false', () => {
    const swipeActions = [{ position: 'left', isDisabled: false }];
    const device = null;

    expect(pipe.transform(item, [swipeActions, device])).toBe(true);
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
