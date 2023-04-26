import { ListSwipeAction } from '@kirbydesign/designsystem/list';
import { GetActionsPipe } from './get-actions.pipe';

describe('GetActionsPipe', () => {
  let pipe: GetActionsPipe;
  let swipeActions: ListSwipeAction[];

  const item = {
    id: 0,
    title: 'Vestas Wind Systems',
    subTitle: '2000 pcs',
    amount: '5.587.218.309 DKK',
    detail: 225,
    archived: true,
    flagged: false,
    color: 'default',
  };

  beforeEach(() => {
    pipe = new GetActionsPipe();
  });

  describe('is array', () => {
    beforeEach(() => {
      swipeActions = [
        {
          position: 'left',
          title: 'Archive',
          type: 'warning',
          onSelected: (item) => {},
        },
      ];
    });

    it('create an instance', () => {
      expect(pipe).toBeTruthy();
    });

    it('should return empty array if swipeActions is not an array', () => {
      const swipeActionsNotArray = null;
      const result = pipe.transform(item, swipeActionsNotArray);

      expect(result).toEqual([]);
    });

    it('should return empty array if swipeActions is an empty array', () => {
      const swipeActionsEmptyArray = [];
      const result = pipe.transform(item, swipeActionsEmptyArray);

      expect(result).toEqual([]);
    });

    it('should return swipeActions if swipeActions is an array', () => {
      const result = pipe.transform(item, swipeActions);

      expect(result).toEqual(swipeActions);
    });
  });

  describe('IsDisabled is a boolean property', () => {
    beforeEach(() => {
      swipeActions = [
        {
          position: 'left',
          title: 'Archive',
          type: 'warning',
          onSelected: (item) => {},
          isDisabled: true,
        },
        {
          position: 'left',
          title: 'Archive',
          type: 'warning',
          onSelected: (item) => {},
          isDisabled: false,
        },
      ];
    });

    it('should return an empty array', () => {
      const [swipeactionDisabledTrue] = swipeActions;
      const result = pipe.transform(item, [swipeactionDisabledTrue]);

      expect(result).toEqual([]);
    });

    it('should return 1 of 1 swipeaction', () => {
      const [, swipeactionDisabledFalse] = swipeActions;
      const result = pipe.transform(item, [swipeactionDisabledFalse]);

      expect(result).toEqual([swipeactionDisabledFalse]);
    });

    it('should return 1 of 2 swipeaction', () => {
      const result = pipe.transform(item, swipeActions);

      expect(result).toEqual([swipeActions[1]]);
    });
  });

  describe('IsDisabled is a function', () => {
    beforeEach(() => {
      swipeActions = [
        {
          position: 'left',
          title: 'Archive',
          type: 'warning',
          onSelected: (item) => {},
          isDisabled: () => true,
        },
        {
          position: 'left',
          title: 'Archive',
          type: 'warning',
          onSelected: (item) => {},
          isDisabled: () => false,
        },
      ];
    });

    it('should return an empty array', () => {
      const [swipeactionDisabledTrue] = swipeActions;
      const result = pipe.transform(item, [swipeactionDisabledTrue]);

      expect(result).toEqual([]);
    });

    it('should return 1 of 1 swipeaction', () => {
      const [, swipeactionDisabledFalse] = swipeActions;
      const result = pipe.transform(item, [swipeactionDisabledFalse]);

      expect(result).toEqual([swipeactionDisabledFalse]);
    });

    it('should return 1 of 2 swipeaction', () => {
      const result = pipe.transform(item, swipeActions);

      expect(result).toEqual([swipeActions[1]]);
    });
  });
});
