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

  function queryItemOptionElements() {
    ionItemOptionElements = spectator.element.querySelectorAll('ion-item-option');
  }

  function queryItemOptionsElement() {
    ionItemOptionsElement = spectator.element.querySelector('ion-item-options');
  }

  beforeEach(() => {
    spectator = createHost(
      '<kirby-item-sliding><kirby-item>Item</kirby-item></kirby-item-sliding>'
    );

    queryItemOptionsElement();
    queryItemOptionElements();
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
      queryItemOptionElements();
      queryItemOptionsElement();

      // Verify each title is unique; it can then be used as identifier in tests
      const uniqueSwipeActionTitles = new Set(swipeActions.map(({ title }) => title));
      expect(swipeActions.length).not.toBe(0);
      expect(uniqueSwipeActionTitles.size).toBe(swipeActions.length);
    });

    it('should render swipeActions in the correct slot by default', () => {
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

    it('should render an ion-item-option element for each swipe action', () => {
      expect(ionItemOptionElements.length).toEqual(swipeActions.length);
    });

    it('should render ion-item-option elements in same order as swipeActions are given', () => {
      // QuerySelectorAll returns elements in document order
      ionItemOptionElements.forEach((ionItemOptionElement, index) => {
        const optionLabel = ionItemOptionElement.querySelector('ion-label');
        expect(optionLabel.innerHTML).toEqual(swipeActions[index].title as string);
      });
    });

    describe('when a swipeAction is disabled', () => {
      beforeEach(() => {
        const swipeActionsWithDisabled = JSON.parse(JSON.stringify(swipeActions));
        swipeActionsWithDisabled[0]['isDisabled'] = true;

        expect(swipeActionsWithDisabled.length).toBe(swipeActions.length);

        spectator.setInput('swipeActions', swipeActionsWithDisabled);
        queryItemOptionElements();
      });

      it('should not render the disabled swipeAction', () => {
        expect(ionItemOptionElements.length).toBe(swipeActions.length - 1);
      });
    });

    const swipeActionTypesScenarios: { [key in ListSwipeActionType]: string } = {
      warning: '#ffca3a',
      success: '#2cf287',
      danger: '#ff595e',
    };

    Object.entries(swipeActionTypesScenarios).forEach(([type, color]) => {
      describe(`when a swipeAction has type ${type}`, () => {
        let swipeActionWithType: HTMLIonItemOptionElement;
        beforeEach(() => {
          const typeIdx = swipeActions.findIndex((swipeAction) => swipeAction.type === type);
          swipeActionWithType = ionItemOptionElements[typeIdx];
          expect(swipeActionWithType).not.toBeUndefined();
        });

        it('should render with correct background color', () => {
          expect(swipeActionWithType).toHaveComputedStyle({ 'background-color': color });
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
