import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MenuComponent } from 'menu/src';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { PlatformService } from '@kirbydesign/designsystem/helpers';
import { ListModule } from '../list.module';
import { ListItemComponent } from './list-item.component';
import {
  MockKirbyItemComponent,
  mockPlatformServiceIsTouchFalse,
  testSwipeActions,
} from './list-item-test-helper';

describe('ListItemComponent', () => {
  let spectator: SpectatorHost<MockKirbyItemComponent>;

  const createHost = createHostFactory({
    component: MockKirbyItemComponent,
    declarations: [MockKirbyItemComponent],
    imports: [ListModule, ItemModule, MenuComponent, IconModule, ButtonComponent],
  });

  let sutComponent: ListItemComponent;

  describe('default', () => {
    beforeEach(async () => {
      spectator = createHost(`<kirby-mock-item></kirby-mock-item>`);

      await spectator.fixture.whenStable();
      sutComponent = spectator.component.sutComponentRef;
    });

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });

    it('should have 1 item', async () => {
      const kirbyItem = spectator.queryAll('kirby-item');

      expect(kirbyItem.length).toBe(1);
    });
  });

  describe('when on a desktop', () => {
    describe('with swipe actions', () => {
      let menu;
      beforeEach(async () => {
        spectator = createHost(`<kirby-mock-item></kirby-mock-item>`, {
          providers: [{ provide: PlatformService, useValue: mockPlatformServiceIsTouchFalse }],
        });

        await spectator.fixture.whenStable();
        sutComponent = spectator.component.sutComponentRef;

        sutComponent.swipeActions = [...testSwipeActions];
        spectator.detectChanges();

        menu = spectator.queryAll('kirby-menu');
      });

      it('should have 1 item with a kirby-menu', () => {
        expect(sutComponent.swipeActions).toHaveLength(3);
        expect(menu.length).toBe(1);
      });

      describe('with one swipe action', () => {
        let button;
        let iconInButton;
        const defaultSwipeAction = testSwipeActions[0];

        beforeEach(async () => {
          sutComponent.swipeActions = [defaultSwipeAction];
          spectator.detectChanges();

          button = spectator.query('[kirby-button]');
          iconInButton = button.querySelector('kirby-icon');
        });

        it('should have a button with an icon', () => {
          expect(button).toBeTruthy();

          expect(iconInButton).toBeTruthy();

          const iconNameAttribute = iconInButton.getAttribute('ng-reflect-name');
          expect(iconNameAttribute).toEqual(defaultSwipeAction.icon as string);
        });

        it('should have a button with an icon, when icon is a function', () => {
          sutComponent.swipeActions = [{ ...testSwipeActions[0], icon: () => 'plus' }];
          spectator.detectChanges();

          expect(button).toBeTruthy();

          expect(iconInButton).toBeTruthy();

          const iconNameAttribute = iconInButton.getAttribute('ng-reflect-name');
          expect(iconNameAttribute).toEqual('plus');
        });

        it('should have a button with [noDecoration]="true"', () => {
          const noDecorationAttribute = button.getAttribute('ng-reflect-no-decoration');
          expect(noDecorationAttribute).toEqual('true');
        });
      });
    });

    describe('without actions', () => {
      beforeEach(async () => {
        spectator = createHost(`<kirby-mock-item></kirby-mock-item>`, {
          providers: [{ provide: PlatformService, useValue: mockPlatformServiceIsTouchFalse }],
        });

        await spectator.fixture.whenStable();
        sutComponent = spectator.component.sutComponentRef;

        sutComponent.swipeActions = [];
        spectator.detectChanges();
      });

      it('should have an ion-item-sliding', () => {
        expect(sutComponent.swipeActions).toHaveLength(0); // if it had actions, it should be using menu
        expect(spectator.queryAll('ion-item-sliding')).toHaveLength(1);
      });
    });
  });

  describe('when on a touch device', () => {
    /**
     * SwipeActions has not been tested previously,
     * and it is out of scope for this PR to do so.
     * I have created an issue with tech debt for this feature:
     */
    describe('with actions', () => {
      it('should have an ion-item-sliding', () => {
        expect(sutComponent.swipeActions).toHaveLength(0); // if it had actions, it should be using menu
        expect(spectator.queryAll('ion-item-sliding')).toHaveLength(1);
      });
    });
    describe('without actions', () => {
      it('should have an ion-item-sliding', () => {
        expect(sutComponent.swipeActions).toHaveLength(0); // if it had actions, it should be using menu
        expect(spectator.queryAll('ion-item-sliding')).toHaveLength(1);
      });
    });
  });

  // describe('When having a boundaryClass', () => {
  //   describe('and device is touch', () => {
  //     it('should have class first', () => {});
  //     it('should have class last', () => {});
  //   });
  // });
});
