import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';

import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';

import { DesignTokenHelper } from './../../helpers/design-token-helper';
import { EmptyStateComponent } from './empty-state.component';

fdescribe('EmptyStateComponent with slotted buttons', () => {
  let spectator: SpectatorHost<EmptyStateComponent>;
  let element: HTMLElement;
  let buttons: ButtonComponent[];

  const createHost = createHostFactory({
    component: EmptyStateComponent,
    declarations: [MockComponent(IconComponent), ButtonComponent],
  });

  beforeEach(() => {
    spectator = createHost(`
          <kirby-empty-state
              iconName="help"
              title="No items"
              subtitle="You don't have any items. Call support to add some items to your account."
          >
              <button kirby-button attentionLevel='1'>Call support</button>
              <button kirby-button attentionLevel='2'>Mail support</button>
              <button kirby-button attentionLevel='3'>Get directions </button>
              <button kirby-button attentionLevel='4'>Mail support</button>
          </kirby-empty-state>
      `);

    element = spectator.element;
    buttons = spectator.queryAll(ButtonComponent);
  });

  it('should set the attention level of all buttons to 3', () => {
    expect(buttons.every((button) => button.isAttentionLevel3)).toBeTrue();
  });

  it('should enforce attention level rules when a button is added', () => {
    expect('implement me').toBeTrue();
  });

  it('should enforce attention level rules when a button is removed', () => {
    expect('implement me').toBeTrue();
  });
});

fdescribe('EmptyStateComponent with slotted buttons where the first has attention level 1', () => {
  let spectator: SpectatorHost<EmptyStateComponent>;
  let element: HTMLElement;
  let buttons: ButtonComponent[];

  const createHost = createHostFactory({
    component: EmptyStateComponent,
    declarations: [MockComponent(IconComponent), ButtonComponent],
  });

  beforeEach(() => {
    spectator = createHost(`
        <kirby-empty-state
            iconName="help"
            title="No items"
            subtitle="You don't have any items. Call support to add some items to your account."
        >
            <button kirby-button attentionLevel='1'>Call support</button>
            <button kirby-button attentionLevel='2'>Mail support</button>
            <button kirby-button attentionLevel='3'>Get directions </button>
            <button kirby-button attentionLevel='4'>Mail support</button>
        </kirby-empty-state>
    `);

    element = spectator.element;
    buttons = spectator.queryAll(ButtonComponent);
  });

  it('should not change the attention level of the first button', () => {
    expect(buttons[0].isAttentionLevel1).toBeTrue();
  });

  it('should set the attention level of all buttons to 3 except the first one', () => {
    const allButtonsButTheFirst = buttons.splice(1, buttons.length);
    expect(allButtonsButTheFirst.every((button) => button.isAttentionLevel3)).toBeTrue();
  });
});
