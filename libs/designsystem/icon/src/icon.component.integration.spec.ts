import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';
import { ItemModule } from '@kirbydesign/designsystem/item';

import { TestHelper } from '@kirbydesign/designsystem/testing';
import { IconComponent } from './icon.component';
import { IconModule } from './icon.module';

const size = DesignTokenHelper.size;

describe('IconComponent in Item', () => {
  let spectator: SpectatorHost<IconComponent>;

  const createHost = createHostFactory({
    component: IconComponent,
    imports: [IconModule, ItemModule],
  });

  describe('slotted start', () => {
    beforeEach(async () => {
      spectator = createHost(`<kirby-item>
        <kirby-icon slot="start"></kirby-icon>
      </kirby-item>`);
      const ionItem = spectator.queryHost('ion-item');
      await TestHelper.whenReady(ionItem);
    });

    it(`should have correct vertical spacing`, () => {
      expect(spectator.element).toHaveComputedStyle({
        'margin-inline-end': size('xxs'),
      });
    });
  });

  describe('slotted end', () => {
    beforeEach(async () => {
      spectator = createHost(`<kirby-item>
        <kirby-icon slot="end"></kirby-icon>
      </kirby-item>`);
      const ionItem = spectator.queryHost('ion-item');
      await TestHelper.whenReady(ionItem);
    });

    it(`should have correct vertical spacing`, () => {
      expect(spectator.element).toHaveComputedStyle({
        'margin-inline-start': size('xxs'),
      });
    });
  });
});
