import { createHostFactory, Spectator } from '@ngneat/spectator';

import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';
import { TestHelper } from '@kirbydesign/designsystem/testing';

import { ActionGroupComponent } from './action-group.component';

const { size } = DesignTokenHelper;

describe('ActionGroupComponent', () => {
  const createHost = createHostFactory({
    component: ActionGroupComponent,
    imports: [TestHelper.ionicModuleForTest, ButtonComponent],
    detectChanges: true,
  });

  describe('by default', () => {
    let spectator: Spectator<ActionGroupComponent>;
    beforeEach(() => {
      spectator = createHost(`
      <kirby-action-group>
        <button kirby-button>Action 1</button>
        <button kirby-button>Action 2</button>
      </kirby-action-group>`);
    });

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });

    it(`should render slotted buttons`, () => {
      const buttons = spectator.element.querySelectorAll(':scope > button[kirby-button]');

      expect(buttons).toHaveLength(2);
    });

    it(`should render hidden "more" menu`, () => {
      const moreMenu = spectator.query('kirby-dropdown');

      expect(moreMenu).toBeTruthy();
      expect(moreMenu).toBeHidden();
    });

    it(`should have correct spacing on buttons`, () => {
      const buttons = spectator.element.querySelectorAll(':scope > button[kirby-button]');
      const moreMenu = spectator.query('kirby-dropdown');

      buttons.forEach((btn) =>
        expect(btn).toHaveComputedStyle({
          margin: '0px',
        })
      );
      expect(moreMenu).toHaveComputedStyle({
        margin: '0px',
      });
      expect(spectator.element).toHaveComputedStyle({
        gap: size('xxs'),
      });
    });
  });
});
