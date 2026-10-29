import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';
import { TestHelper } from '@kirbydesign/designsystem/testing';
import { ItemComponent } from '@kirbydesign/designsystem/item';
import { RadioComponent } from './radio.component';

const { size } = DesignTokenHelper;

describe('RadioComponent in Item', () => {
  let spectator: SpectatorHost<RadioComponent>;
  let ionRadio: HTMLIonRadioElement;

  const createHost = createHostFactory({
    component: RadioComponent,
    imports: [TestHelper.ionicModuleForTest, ItemComponent],
  });

  describe('by default', () => {
    beforeEach(async () => {
      spectator = createHost(`
    <kirby-item>
      <kirby-radio></kirby-radio>
    </kirby-item>`);
      const ionItem = spectator.queryHost('ion-item');
      await TestHelper.whenReady(ionItem);
      ionRadio = spectator.query('ion-radio');
    });

    it(`icon should not have any margin`, () => {
      expect(ionRadio).toHaveComputedStyle({
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
    beforeEach(async () => {
      spectator = createHost(`
    <kirby-item>
      <kirby-radio slot="start"></kirby-radio>
    </kirby-item>`);
      const ionItem = spectator.queryHost('ion-item');
      await TestHelper.whenReady(ionItem);
    });

    it(`should have correct vertical spacing`, () => {
      expect(spectator.element).toHaveComputedStyle({
        'margin-inline-end': size('xs'),
      });
    });
  });
});
