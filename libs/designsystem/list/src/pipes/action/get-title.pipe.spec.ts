import { ListSwipeAction } from '@kirbydesign/designsystem/list';
import { GetActionTitlePipe } from './get-title.pipe';

describe('GetTitlePipe', () => {
  let pipe: GetActionTitlePipe;

  beforeEach(() => {
    pipe = new GetActionTitlePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('When title is a string', () => {
    it(`should return 'TestTitle' `, () => {
      const action: ListSwipeAction = {
        title: 'TestTitle',
        position: 'left',
        isDisabled: false,
        onSelected: () => {},
      };

      expect(pipe.transform(action)).toEqual('TestTitle');
    });
  });

  describe('When title is a function', () => {
    it(`should return 'TestTitle' `, () => {
      const action: ListSwipeAction = {
        title: (item: any) => (item.flagged ? 'TestTitle' : 'TestTitle2'),
        position: 'left',
        isDisabled: false,
        onSelected: () => {},
      };

      expect(pipe.transform(action, { flagged: true })).toEqual('TestTitle');
    });

    it(`should return 'TestTitle2' `, () => {
      const action: ListSwipeAction = {
        title: (item: any) => (item.flagged ? 'TestTitle' : 'TestTitle2'),
        position: 'left',
        isDisabled: false,
        onSelected: () => {},
      };

      expect(pipe.transform(action, { flagged: false })).toEqual('TestTitle2');
    });
  });
});
