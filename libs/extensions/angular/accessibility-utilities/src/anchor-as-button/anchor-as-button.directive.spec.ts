import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';

import { AnchorAsButtonDirective } from './anchor-as-button.directive';

describe('AnchorAsButtonDirective', () => {
  let spectator: SpectatorHost<AnchorAsButtonDirective>;

  const createHost = createHostFactory({
    component: AnchorAsButtonDirective,
  });

  beforeEach(() => {
    spectator = createHost('<a anchorAsButton>Test Link</a>');
  });

  it('should set role="button" and tabindex="0" on the element', () => {
    expect(spectator.element.getAttribute('role')).toBe('button');
    expect(spectator.element.getAttribute('tabindex')).toBe('0');
  });

  it('should set cursor to pointer on initialization', () => {
    expect(getComputedStyle(spectator.element).cursor).toBe('pointer');
  });

  it('should call click on Enter keydown', () => {
    const clickSpy = jest.spyOn(spectator.element, 'click');

    spectator.element.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter' })
    );

    expect(clickSpy).toHaveBeenCalled();
  });

  it('should prevent default behavior on Enter keydown', () => {
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

    spectator.element.dispatchEvent(event);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});
