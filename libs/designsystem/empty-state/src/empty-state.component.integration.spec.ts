import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';

import { IconComponent } from '@kirbydesign/designsystem/icon';
import { ButtonComponent } from '@kirbydesign/designsystem/button';

import { PageComponent } from '@kirbydesign/designsystem/page';
import { EmptyStateComponent } from '@kirbydesign/designsystem/empty-state';

describe('EmptyStateComponent with slotted buttons', () => {
  let spectator: SpectatorHost<EmptyStateComponent>;
  let buttons: ButtonComponent[];

  const createHost = createHostFactory({
    component: EmptyStateComponent,
    imports: [PageComponent],
    declarations: [MockComponent(IconComponent), ButtonComponent],
  });

  beforeEach(() => {
    spectator = createHost(`
          <kirby-empty-state
              iconName="help"
              title="No items"
              subtitle="You don't have any items. Call support to add some items to your account."
          >
              <button kirby-button>Call support</button>
              <button kirby-button>Mail support</button>
              <button kirby-button>Get directions</button>
          </kirby-empty-state>
      `);

    buttons = spectator.queryAll(ButtonComponent);
  });

  it('should not change the attention level of the first button', () => {
    expect(buttons[0].attentionLevel).toBeUndefined();
    expect(buttons[0]._cssClass).toContain('attention-level1');
  });

  it('should set the attention level of all buttons to 3 except the first one', () => {
    const allButtonsButTheFirst = buttons.splice(1, buttons.length);
    expect(allButtonsButTheFirst.every((button) => button.attentionLevel === '3')).toBeTrue();
  });
});

describe('EmptyStateComponent with slotted buttons configured with attention levels', () => {
  let spectator: SpectatorHost<EmptyStateComponent>;
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
              <button kirby-button attentionLevel="3">Call support</button>
              <button kirby-button attentionLevel="2">Mail support</button>
              <button kirby-button attentionLevel="1">Get directions</button>
          </kirby-empty-state>
      `);

    buttons = spectator.queryAll(ButtonComponent);
  });

  it('should set the attention level of all buttons to 3', () => {
    expect(buttons.every((button) => button.attentionLevel === '3')).toBeTrue();
  });
});

describe('EmptyStateComponent with slotted buttons configured with attention levels where the first has attention level 1', () => {
  let spectator: SpectatorHost<EmptyStateComponent>;
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
            <button kirby-button attentionLevel="1">Call support</button>
            <button kirby-button attentionLevel="2">Mail support</button>
            <button kirby-button attentionLevel="3">Get directions</button>
        </kirby-empty-state>
    `);

    buttons = spectator.queryAll(ButtonComponent);
  });

  it('should not change the attention level of the first button', () => {
    expect(buttons[0].attentionLevel).toEqual('1');
  });

  it('should set the attention level of all buttons to 3 except the first one', () => {
    const allButtonsButTheFirst = buttons.splice(1, buttons.length);
    expect(allButtonsButTheFirst.every((button) => button.attentionLevel === '3')).toBeTrue();
  });
});
