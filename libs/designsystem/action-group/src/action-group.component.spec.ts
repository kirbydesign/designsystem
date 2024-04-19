import { createHostFactory, Spectator } from '@ngneat/spectator';

import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';
import { TestHelper } from '@kirbydesign/designsystem/testing';

import {
  ACTIONGROUP_CONFIG,
  ActionGroupComponent,
  ActionGroupConfig,
} from './action-group.component';

const { size } = DesignTokenHelper;

describe('ActionGroupComponent', () => {
  let spectator: Spectator<ActionGroupComponent>;
  let config: ActionGroupConfig;

  const createHost = createHostFactory({
    component: ActionGroupComponent,
    imports: [TestHelper.ionicModuleForTest, ButtonComponent],
    template: `<kirby-action-group [visibleActions]="visibleActions">
                <button kirby-button>Action 1</button>
                <button kirby-button>Action 2</button>
                <button kirby-button>Action 3</button>
                <button kirby-button>Action 4</button>
                <button kirby-button>Action 5</button>
              </kirby-action-group>`,
    providers: [
      {
        provide: ACTIONGROUP_CONFIG,
        useFactory: () => {
          return config;
        },
      },
    ],
  });

  describe('by default', () => {
    beforeEach(() => {
      spectator = createHost();
    });

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });

    it('should render slotted buttons', () => {
      const buttons = spectator.element.querySelectorAll(':scope > button[kirby-button]');
      expect(buttons).toHaveLength(5);
    });

    it('should render hidden "more" menu', () => {
      const moreMenu = spectator.query('kirby-menu');
      expect(moreMenu).toBeTruthy();
      expect(moreMenu).toBeHidden();
    });

    it('should have correct spacing on buttons', () => {
      const buttons = spectator.element.querySelectorAll(':scope > button[kirby-button]');
      const moreMenu = spectator.query('kirby-menu');

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

    describe('when setting visibleActions', () => {
      it('should only show buttons as configured in visibleActions', () => {
        spectator.setInput('visibleActions', 3);

        const buttons = spectator.element.querySelectorAll(':scope > button[kirby-button]');
        expect(buttons).toHaveLength(3);
      });

      it('should hide buttons as configured in visibleActions', () => {
        spectator.setInput('visibleActions', 3);

        const buttons = spectator.element.querySelectorAll('.hidden-layer> button[kirby-button]');
        expect(buttons).toHaveLength(2);
        buttons.forEach((btn) => {
          expect(btn).toBeHidden();
        });
      });
    });
  });

  describe('when configured with visibleActions', () => {
    beforeEach(() => {
      spectator = createHost(undefined, {
        hostProps: {
          visibleActions: 3,
        },
      });
    });

    it('should be collapsed', () => {
      expect(spectator.component._isCollapsed).toBeTrue();
    });

    it('should show the "more" menu', () => {
      const moreMenu = spectator.query('kirby-menu');
      expect(moreMenu).toBeVisible();
    });

    it('should only show buttons as configured in visibleActions', () => {
      const buttons = spectator.element.querySelectorAll(':scope > button[kirby-button]');
      expect(buttons).toHaveLength(3);
    });

    it('should hide buttons as configured in visibleActions', () => {
      const buttons = spectator.element.querySelectorAll('.hidden-layer> button[kirby-button]');
      expect(buttons).toHaveLength(2);
      buttons.forEach((btn) => {
        expect(btn).toBeHidden();
      });
    });

    it('should render hidden buttons as menu items', () => {
      expect(spectator.component._collapsedActions).toHaveLength(2);
    });

    describe('when updating visibleActions', () => {
      it('should show buttons as configured in visibleActions', () => {
        spectator.setInput('visibleActions', 4);

        const buttons = spectator.element.querySelectorAll(':scope > button[kirby-button]');
        expect(buttons).toHaveLength(4);
      });

      it('should hide buttons as configured in visibleActions', () => {
        spectator.setInput('visibleActions', 2);

        const buttons = spectator.element.querySelectorAll('.hidden-layer> button[kirby-button]');
        expect(buttons).toHaveLength(3);
        buttons.forEach((btn) => {
          expect(btn).toBeHidden();
        });
      });
    });
  });

  describe('when provided with config', () => {
    afterEach(() => {
      config = undefined;
    });

    describe('and configured with defaultVisibleActions', () => {
      it('should set visibleActions as configured in defaultVisibleActions', () => {
        config = {
          defaultVisibleActions: 1,
        };
        spectator = createHost();

        expect(spectator.component.visibleActions).toEqual(1);
      });

      it('should not overwrite visibleActions with defaultVisibleActions if already set', () => {
        config = {
          defaultVisibleActions: 1,
        };
        spectator = createHost(undefined, {
          hostProps: {
            visibleActions: 3,
          },
        });

        expect(spectator.component.visibleActions).toEqual(3);
      });
    });

    describe('and configured with maxVisibleActions', () => {
      it('should set visibleActions as configured in maxVisibleActions', () => {
        config = {
          maxVisibleActions: 3,
        };
        spectator = createHost();

        expect(spectator.component.visibleActions).toEqual(3);
      });

      it('should overwrite visibleActions as configured in maxVisibleActions', () => {
        config = {
          maxVisibleActions: 2,
        };
        spectator = createHost(undefined, {
          hostProps: {
            visibleActions: 3,
          },
        });

        expect(spectator.component.visibleActions).toEqual(2);
      });

      it('should not overwrite visibleActions with maxVisibleActions if already set to less', () => {
        config = {
          maxVisibleActions: 2,
        };
        spectator = createHost(undefined, {
          hostProps: {
            visibleActions: 1,
          },
        });

        expect(spectator.component.visibleActions).toEqual(1);
      });

      describe('when updating visibleActions', () => {
        it('should show buttons as configured in visibleActions when less than maxVisibleActions', () => {
          config = {
            maxVisibleActions: 3,
          };
          spectator = createHost();
          expect(spectator.component.visibleActions).toEqual(3);

          spectator.setInput('visibleActions', 2);

          const buttons = spectator.element.querySelectorAll(':scope > button[kirby-button]');
          expect(buttons).toHaveLength(2);
        });

        it('should not show buttons as configured in visibleActions when greater than maxVisibleActions', () => {
          config = {
            maxVisibleActions: 3,
          };
          spectator = createHost();
          expect(spectator.component.visibleActions).toEqual(3);

          spectator.setInput('visibleActions', 4);

          const buttons = spectator.element.querySelectorAll(':scope > button[kirby-button]');
          expect(buttons).toHaveLength(3);
        });
      });
    });
  });
});
