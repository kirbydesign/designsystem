import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';

import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';

import { IconComponent } from '@kirbydesign/designsystem/icon';

import { EmptyStateComponent } from './empty-state.component';

describe('EmptyStateComponent', () => {
  let spectator: SpectatorHost<EmptyStateComponent>;
  let element: HTMLElement;

  const createHost = createHostFactory({
    component: EmptyStateComponent,
    declarations: [MockComponent(IconComponent)],
  });

  beforeEach(() => {
    spectator = createHost(`
    <kirby-empty-state
      iconName="help"
      title="No items"
      subtitle="You don't have any items. Call support to add some items to your account."
    >
      <button kirby-button>Call support</button>
    </kirby-empty-state>
    `);
    element = spectator.element;
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should render with the correct border width', () => {
    const outlineElement = element.getElementsByClassName('icon-outline')[0];
    expect(outlineElement).toHaveComputedStyle({ 'border-width': DesignTokenHelper.size('xxxs') });
  });
  it('should have title', () => {
    const titleElement = element.querySelector('.title');
    expect(titleElement).toBeTruthy();
    expect(titleElement.textContent).toBe('No items');
  });

  it('should have title as span', () => {
    const titleElement = element.querySelector('.title');
    expect(titleElement?.tagName.toLowerCase()).toBe('span');
  });

  it('should have subtitle', () => {
    const subtitleElement = element.querySelector('.subtitle');
    expect(subtitleElement).toBeTruthy();
    expect(subtitleElement.textContent).toBe(
      "You don't have any items. Call support to add some items to your account."
    );
  });
});
