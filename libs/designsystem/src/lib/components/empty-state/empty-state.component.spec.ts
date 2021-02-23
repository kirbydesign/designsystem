import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';

import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';

import { DesignTokenHelper } from './../../helpers/design-token-helper';
import { EmptyStateComponent } from './empty-state.component';

describe('EmptyStateComponent', () => {
  let spectator: SpectatorHost<EmptyStateComponent>;
  let element: HTMLElement;

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
      <button kirby-button>Call support</button>
      <button kirby-button attentionLevel='2'>Mail support</button>
      <button kirby-button attentionLevel='3'>Get directions </button>
      <button kirby-button attentionLevel='1'>Mail support</button>
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

  describe('Attention level rules for buttons', () => {
    let buttons: ButtonComponent[];

    beforeEach(() => {
      buttons = spectator.queryAll(ButtonComponent);
    });

    it('should change all buttons to attention level 3 except 1', () => {
      const numberLvl3Buttons = buttons.filter((button) => button.isAttentionLevel3).length;
      const numberLvl1Buttons = buttons.filter((button) => button.isAttentionLevel1).length;

      expect(numberLvl1Buttons).toEqual(1);
      expect(numberLvl3Buttons).toEqual(3);
    });

    it('should keep the attention level on the first button with attention level 1', () => {
      expect(buttons.findIndex((button) => button.isAttentionLevel1)).toEqual(0);
    });

    it('should enforce attention level rules when a button is added', () => {
      // TODO: implement test...
    });

    it('should enforce attention level rules when a button is removed', () => {
      // TODO: implement test...
    });
  });
});
