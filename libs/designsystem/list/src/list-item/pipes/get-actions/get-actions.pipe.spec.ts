import { ListItem } from '../../list-item.component';
import { GetActionsPipe } from './get-actions.pipe';

fdescribe('GetActionsPipe', () => {
  const item: ListItem = {
    id: 0,
    title: 'Vestas Wind Systems',
    subTitle: '2000 pcs',
    amount: '5.587.218.309 DKK',
    detail: 225,
    archived: true,
    flagged: false,
    color: 'default',
  };

  let pipe: GetActionsPipe;

  beforeEach(() => {
    pipe = new GetActionsPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return empty array if swipeActions is not an array', () => {
    const swipeActions = null;
    const device = 'desktop';
    const direction = 'left';

    expect(pipe.transform(item, [swipeActions, device, direction])).toEqual([]);
  });

  it('should return empty array if swipeActions is an empty array', () => {
    const swipeActions = [];
    const device = 'desktop';
    const direction = 'left';

    expect(pipe.transform(item, [swipeActions, device, direction])).toEqual([]);
  });

  it('should return array with one item if swipeActions is an array with one item', () => {
    const swipeActions = [{ position: 'left' }];
    const device = 'desktop';
    const direction = 'left';

    expect(pipe.transform(item, [swipeActions, device, direction])).toEqual([{ position: 'left' }]);
  });
});
