import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MockComponents } from 'ng-mocks';

import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';

import { ItemComponent } from '@kirbydesign/designsystem/item';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { CheckboxComponent } from './checkbox.component';

const size = DesignTokenHelper.size;

describe('CheckboxComponent in Item', () => {
  let spectator: SpectatorHost<CheckboxComponent>;
  let ionCheckbox: HTMLIonCheckboxElement;

  const createHost = createHostFactory({
    component: CheckboxComponent,
    imports: [IconModule],
    declarations: MockComponents(ItemComponent),
  });

  describe('by default', () => {
    beforeEach(() => {
      spectator = createHost(`
    <kirby-item>
      <kirby-checkbox></kirby-checkbox>
    </kirby-item>`);
      ionCheckbox = spectator.query('ion-checkbox');
    });

    it(`icon should not have any margin`, () => {
      expect(ionCheckbox).toHaveComputedStyle({
        margin: '0px',
      });
    });

    it(`should have z-index`, () => {
      expect(spectator.element).toHaveComputedStyle({
        'z-index': '1',
      });
    });
  });

  describe('slotted start', () => {
    beforeEach(() => {
      spectator = createHost(`
    <kirby-item>
      <kirby-checkbox slot="start"></kirby-checkbox>
    </kirby-item>`);
      ionCheckbox = spectator.query('ion-checkbox');
    });

    it(`should have correct vertical spacing`, () => {
      expect(spectator.element).toHaveComputedStyle({
        'margin-inline-end': size('xs'),
      });
    });
  });
});
