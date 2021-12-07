import { IonicModule } from '@ionic/angular';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MockComponent, MockModule } from 'ng-mocks';

import { ItemComponent } from '../item/item.component';
import { ListSwipeAction, ListSwipeActionType } from '../list';
import { ItemSwipeAction } from '../list/list-swipe-action.type';

import { ItemSlidingComponent, ItemSlidingSide } from './item-sliding.component';

fdescribe('ItemSlidingComponent', () => {
  let spectator: SpectatorHost<ItemSlidingComponent>;

  const createHost = createHostFactory({
    imports: [MockModule(IonicModule)],
    declarations: [MockComponent(ItemComponent)],
    component: ItemSlidingComponent,
  });

  let ionItemOptionsElement: HTMLIonItemOptionsElement;
  let ionItemOptionElements: NodeListOf<HTMLIonItemOptionElement>;

  beforeEach(() => {
    spectator = createHost(
      '<kirby-item-sliding><kirby-item>Item</kirby-item></kirby-item-sliding>'
    );
    ionItemOptionsElement = spectator.element.querySelector('ion-item-options');
    ionItemOptionElements = spectator.element.querySelectorAll('ion-item-option');
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy;
  });

  it('should project slotted content', () => {
    const itemElement = spectator.element.querySelector('kirby-item');
    expect(itemElement).toBeTruthy();
  });

  describe('without swipeActions', () => {
    it('should not render ion-item-options', () => {
      expect(ionItemOptionsElement).toBeFalsy();
    });
  });

  describe('with swipeActions', () => {
    const swipeActions: ItemSwipeAction[] = [
      {
        title: 'Delete',
        onSelected: () => console.log('test'),
        type: 'danger',
      },
      {
        title: 'Edit',
        icon: 'link',
        type: 'success',
        onSelected: () => console.log('test'),
      },
      {
        title: 'Archive',
        icon: 'link',
        onSelected: () => console.log('test'),
        type: 'warning',
      },
    ];

    beforeEach(() => {
      spectator.setInput('swipeActions', swipeActions);
    });

    it("should render swipeActions in the 'start' slot by default", () => {
      //TODO: Is there a better way to check this?
      expect(ionItemOptionsElement.getAttribute('ng-reflect-side')).toEqual('start');
    });

    const sideScenarios: { [key in ItemSlidingSide]: string } = {
      left: 'start',
      right: 'end',
    };

    Object.entries(sideScenarios).forEach(([side, slot]) => {
      describe(`when 'side' is set to '${side}'`, () => {
        beforeEach(() => {
          // TODO: why do i need any here?
          spectator.setInput('side', side as any);
        });

        it(`should render swipe actions in the correct slot`, () => {
          //TODO: Is there a better way to check this?
          expect(ionItemOptionsElement.getAttribute('ng-reflect-side')).toEqual(slot);
        });
      });
    });

    it('should render an ion-item-option for each swipe action', () => {
      expect(swipeActions.length).not.toBe(0);
      expect(ionItemOptionElements).toHaveLength(swipeActions.length);
    });

    it('should render ion-item-option elements in same order as swipeActions are given', () => {
      // Verify each title is unique; it can then be used as identifier
      const uniqueSwipeActionTitles = new Set(swipeActions.map(({ title }) => title));
      expect(swipeActions.length).not.toBe(0);
      expect(uniqueSwipeActionTitles.size).toBe(swipeActions.length);

      // QuerySelectorAll returns elements in document order
      ionItemOptionElements.forEach((ionItemOptionElement, index) => {
        const optionLabel = ionItemOptionElement.querySelector('ion-label');
        expect(optionLabel.innerHTML).toEqual(swipeActions[index].title as string);
      });
    });

    it('should not render disabled swipeActions', () => {
      expect(true).toBeFalse();
    });

    it('should SOMETHING ABOUT DEFAULT TYPE HERE', () => {
      expect(true).toBeFalse();
    });

    const swipeActionTypesScenarios: { [key in ListSwipeActionType]: string } = {
      warning: '#000',
      success: '#000',
      danger: '#000',
    };

    Object.entries(swipeActionTypesScenarios).forEach(([type, color]) => {
      describe(`when a swipeAction has type ${type}`, () => {
        it('should render with correct background color', () => {
          expect(true).toBeFalse();
        });
      });
    });

    describe('when a swipeAction is clicked', () => {
      it('should evaluate onSelected', () => {
        expect(true).toBeFalse();
      });
    });

    describe('when a swipeAction has an icon', () => {
      it('should render the correct icon', () => {
        expect(true).toBeFalse();
      });

      it('should render the icon in the correct slot', () => {
        expect(true).toBeFalse();
      });

      it('should render the title', () => {
        expect(true).toBeFalse();
      });

      describe('and it is custom', () => {
        it('should render the custom icon', () => {
          expect(true).toBeFalse();
        });
      });
    });

    it('should render the title for each swipeAction', () => {
      expect(true).toBeFalse();
    });

    it('should render swipeAction titles with correct typography', () => {
      expect(true).toBeFalse();
    });

    const swipeActionPropertyFunctionScenarios: {
      [key in keyof Omit<ListSwipeAction, 'onSelected' | 'position'>]: () => any;
    } = {
      title: () => 'title',
      icon: () => 'link',
      type: () => 'danger',
      isDisabled: () => true,
    };

    Object.entries(swipeActionPropertyFunctionScenarios).forEach((property, fn) => {
      describe(`when ${property} is given as function`, () => {
        it('should use the result of the function for the property', () => {
          expect(true).toBeFalse();
        });
      });
    });
  });
});
