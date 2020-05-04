import { MockComponent } from 'ng-mocks';
import { SpectatorHost, createHostFactory } from '@ngneat/spectator';

import { DesignTokenHelper } from './../../helpers/design-token-helper';
import { IconComponent } from '../icon/icon.component';
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
});
