import { Component, ViewChild } from '@angular/core';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { ItemModule } from 'item/src';
import { DesignTokenHelper, ListModule, ListSwipeAction } from 'src/lib';
import { MenuComponent } from 'menu/src';
import { ListItemMenuComponent } from './list-item-menu.component';

const getColor = DesignTokenHelper.getColor;

@Component({
  selector: 'kirby-mock-item',
  template: `
    <ng-template #MockKirbyItem>
      <kirby-item>
        {{ item.text }}
      </kirby-item>
    </ng-template>

    <kirby-list-item-menu
      #sutComponentRef
      [item]="item"
      [itemTemplate]="MockKirbyItem"
      [boundaryClass]="'first'"
      (swipeActionSelect)="onItemSelected($event)"
    ></kirby-list-item-menu>
  `,
})
class MockKirbyItemComponent {
  @ViewChild('sutComponentRef') public sutComponentRef: ListItemMenuComponent;
  public item = { text: 'I am an item' };

  public onItemSelected(item: any) {}
}

describe('ListItemMenuComponent', () => {
  let spectator: SpectatorHost<MockKirbyItemComponent>;

  const createHost = createHostFactory({
    component: MockKirbyItemComponent,
    declarations: [MockKirbyItemComponent, ListItemMenuComponent],
    imports: [ListModule, ItemModule, MenuComponent, IconModule, ButtonComponent],
  });

  let sutComponent: ListItemMenuComponent;

  beforeEach(async () => {
    spectator = createHost(`<kirby-mock-item></kirby-mock-item>`);

    await spectator.fixture.whenStable();
    sutComponent = spectator.component.sutComponentRef;
  });

  describe('default', () => {
    it('should create', () => {
      expect(spectator).toBeTruthy();
    });

    it('should have a kirby-item', () => {
      expect(spectator.query('.menu-item')).toBeTruthy();
      expect(sutComponent.itemTemplate).toBeTruthy();
      expect(spectator.query('kirby-item')).toBeTruthy();
    });
  });

  describe('with one swipe action', () => {
    let button;
    let iconInButton;
    const defaultSwipeAction: ListSwipeAction = {
      position: 'left',
      title: 'Archive',
      type: 'warning',
      onSelected: (item) => null,
      isDisabled: (_item: any) => false,
      icon: 'plus',
    };

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

    it('should have a button with [noDecoration]="true"', () => {
      const noDecorationAttribute = button.getAttribute('ng-reflect-no-decoration');
      expect(noDecorationAttribute).toEqual('true');
    });

    it('should not have a divider', () => {
      expect(spectator.query('.menu-divider')).toBeFalsy();
    });
  });

  describe('with two swipe actions', () => {
    const defaultSwipeActions: ListSwipeAction[] = [
      {
        position: 'left',
        title: 'Archive',
        type: 'warning',
        onSelected: (item) => null,
        isDisabled: (_item: any) => false,
        icon: 'more',
      },
      {
        position: 'left',
        title: 'Delete',
        type: 'warning',
        onSelected: (item) => null,
        isDisabled: (_item: any) => false,
        icon: 'more',
      },
    ];
    let menu;

    beforeEach(() => {
      sutComponent.swipeActions = [defaultSwipeActions[0], defaultSwipeActions[1]];
      spectator.detectChanges();
      menu = spectator.query('kirby-menu');
    });

    it('should have a menu with two items', () => {
      expect(menu).toBeTruthy();

      const menuItems = menu.querySelectorAll('kirby-item');
      expect(menuItems).toHaveLength(2);
    });

    it('should have a menu with two items with the correct titles', () => {
      const menuItems = menu.querySelectorAll('kirby-item');
      expect(menuItems[0].textContent).toEqual(defaultSwipeActions[0].title);
      expect(menuItems[1].textContent).toEqual(defaultSwipeActions[1].title);
    });

    it('should have a menu with two items, which both are selectable', () => {
      const menuItems = menu.querySelectorAll('kirby-item');

      expect(menuItems[0].getAttribute('ng-reflect-selectable')).toEqual('true');
      expect(menuItems[1].getAttribute('ng-reflect-selectable')).toEqual('true');
    });

    it('should have a menu item with an onSelected function', () => {
      const selectedSpy = spyOn(spectator.component, 'onItemSelected');

      const menuItems = menu.querySelectorAll('kirby-item');
      menuItems[0].click();

      expect(selectedSpy).toHaveBeenCalled();
      expect(selectedSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('when an action is clicked', () => {
    describe('and there is one action', () => {
      const defaultSwipeActions: ListSwipeAction[] = [
        {
          position: 'right',
          title: 'Delete',
          type: 'warning',
          onSelected: (item) => null,
          isDisabled: (_item: any) => false,
          icon: 'more',
        },
      ];

      let singleAction;

      beforeEach(() => {
        sutComponent.swipeActions = defaultSwipeActions;
        spectator.detectChanges();
        singleAction = spectator.query('[kirby-button] kirby-icon');
      });

      it('should call the onSelected function of the clicked action', () => {
        const selectedSpy = spyOn(spectator.component, 'onItemSelected');

        expect(singleAction).toBeTruthy();
        expect(selectedSpy).not.toHaveBeenCalled();

        singleAction.click();

        expect(selectedSpy).toHaveBeenCalledOnceWith(
          jasmine.objectContaining({ swipeAction: defaultSwipeActions[0] })
        );
      });
    });

    describe('and there are two actions', () => {
      const defaultSwipeActions: ListSwipeAction[] = [
        {
          position: 'left',
          title: 'Archive',
          type: 'warning',
          onSelected: (item) => null,
          isDisabled: (_item: any) => false,
          icon: 'more',
        },
        {
          position: 'right',
          title: 'Delete',
          type: 'warning',
          onSelected: (item) => null,
          isDisabled: (_item: any) => false,
          icon: 'more',
        },
      ];
      let menu;

      beforeEach(() => {
        sutComponent.swipeActions = defaultSwipeActions;
        spectator.detectChanges();
        menu = spectator.query('kirby-menu');
      });

      it('should call the onSelected function of the clicked action', () => {
        const selectedSpy = spyOn(spectator.component, 'onItemSelected');

        const menuItems = menu.querySelectorAll('kirby-item');
        expect(selectedSpy).toHaveBeenCalledTimes(0);
        menuItems[0].click();

        expect(selectedSpy).toHaveBeenCalledOnceWith(
          jasmine.objectContaining({ swipeAction: defaultSwipeActions[0] })
        );
      });
    });

    describe('from 1 to 2 actions', () => {
      const defaultSwipeActions: ListSwipeAction[] = [
        {
          position: 'left',
          title: 'Archive',
          type: 'warning',
          onSelected: (item) => null,
          isDisabled: (_item: any) => false,
          icon: 'more',
        },
        {
          position: 'right',
          title: 'Delete',
          type: 'warning',
          onSelected: (item) => null,
          isDisabled: (_item: any) => false,
          icon: 'more',
        },
      ];
      let menu;

      beforeEach(() => {
        sutComponent.swipeActions = [defaultSwipeActions[0]];
        spectator.detectChanges();
        menu = spectator.query('kirby-menu');
      });

      it('should have 1 action as button and then have a menu with 2 items', () => {
        let singleActions = spectator.queryAll('[kirby-button]  kirby-icon');
        let singleAction = singleActions[0];

        expect(singleActions).toHaveLength(1);
        expect(singleAction.closest('kirby-menu')).toBeFalsy(); // verifies that the action is not inside a menu
        expect(menu).toBeFalsy();

        sutComponent.swipeActions = [...defaultSwipeActions];
        spectator.detectChanges();
        menu = spectator.query('kirby-menu');

        expect(menu).toBeTruthy();

        singleActions = spectator.queryAll('[kirby-button]  kirby-icon');
        singleAction = singleActions[0];

        expect(singleActions).toHaveLength(1);
        expect(singleAction.closest('kirby-menu')).toBeTruthy();
      });
    });
  });
});
