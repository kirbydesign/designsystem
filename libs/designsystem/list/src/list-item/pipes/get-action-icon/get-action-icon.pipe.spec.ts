import { ListItemAction } from '../has-actions/has-actions.pipe';
import { GetActionIconPipe } from './get-action-icon.pipe';

describe('GetActionIconPipe', () => {
  const action: ListItemAction = {
    isDisabled: false,
    position: 'left',
    icon: () => 'person',
  };
  const item = {};

  it('create an instance', () => {
    const pipe = new GetActionIconPipe();

    expect(pipe).toBeTruthy();
  });

  it(`should return 'undefined' if action.icon is undefined`, () => {
    const pipe = new GetActionIconPipe();

    const actionUndefinedIcon = { ...action, icon: undefined };

    expect(pipe.transform(actionUndefinedIcon, item)).toBeUndefined();
  });

  it(`should return 'person' if action.icon is a function`, () => {
    const pipe = new GetActionIconPipe();

    expect(pipe.transform(action, item)).toBe('person');
  });

  it(`should return 'person' if action.icon is a string`, () => {
    const pipe = new GetActionIconPipe();

    const actionStringIcon = { ...action, icon: 'person' };

    expect(pipe.transform(actionStringIcon, item)).toBe('person');
  });
});
