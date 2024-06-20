import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { ItemModule } from '@kirbydesign/designsystem/item';
import {
  ItemSlidingComponent,
  ItemSwipeAction,
  ItemSwipeActionType,
} from '@kirbydesign/designsystem/item-sliding';

const { getColor } = DesignTokenHelper;

describe('ItemSlidingComponent', () => {
  let spectator: SpectatorHost<ItemSlidingComponent>;

  const createHost = createHostFactory({
    component: ItemSlidingComponent,
    imports: [ItemModule],
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
    expect(spectator.component).toBeTruthy();
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

    it('should render an ion-item-option element for each swipe action', () => {
      expect(ionItemOptionElements.length).toEqual(swipeActions.length);
    });

    it('should render ion-item-option elements in same order as swipeActions are given', () => {
      // QuerySelectorAll returns elements in document order
      ionItemOptionElements.forEach((ionItemOptionElement, index) => {
        const optionLabel = ionItemOptionElement.querySelector('ion-label');
        expect(optionLabel.innerHTML).toEqual(swipeActions[index].title);
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

    const swipeActionTypesScenarios: { [key in ItemSwipeActionType]: string } = {
      warning: getColor('warning').hex,
      success: getColor('success').hex,
      danger: getColor('danger').hex,
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
      it('should call onSelected', () => {
        const idx = 0;
        const onSelectedSpy = spyOn(spectator.component.swipeActions[idx], 'onSelected');
        ionItemOptionElements[idx].click();
        expect(onSelectedSpy).toHaveBeenCalled();
      });

      it('should call close', () => {
        const idx = 0;
        const closeSpy = spyOn(spectator.component.itemSliding, 'close');
        ionItemOptionElements[idx].click();
        expect(closeSpy).toHaveBeenCalled();
        expect(closeSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('when a swipeAction has an icon', () => {
      let kirbyIconElement: HTMLElement;

      beforeEach(() => {
        const swipeActionsWithIcons = swipeActions.map((swipeAction) => ({
          ...swipeAction,
          icon: 'flash',
        }));
        spectator.setInput('swipeActions', swipeActionsWithIcons);
        queryItemOptionElements();
        kirbyIconElement = ionItemOptionElements[0].querySelector('kirby-icon');
      });

      it('should render the icon in the correct slot', () => {
        expect(kirbyIconElement.slot).toEqual('top');
      });

      it('should render the title', () => {
        const optionLabel = ionItemOptionElements[0].querySelector('ion-label');
        expect(optionLabel.innerHTML).toEqual(swipeActions[0].title);
      });
    });
  });
});
