import { SpectatorHost } from '@ngneat/spectator';

import { ListSwipeAction, ListSwipeActionType } from '../list';

import { ItemSlidingComponent, ItemSlidingSide } from './item-sliding.component';

describe('ItemSlidingComponent', () => {
  let spectator: SpectatorHost<ItemSlidingComponent>;

  it('should create', () => {});

  it('should project slotted content', () => {});

  describe('without swipeActions', () => {
    it('should not render ion-item-options', () => {});
  });

  describe('with swipeActions', () => {
    it("should render swipeActions in the 'start' slot by default", () => {});

    const sideScenarios: { [key in ItemSlidingSide]: string } = {
      left: 'start',
      right: 'end',
    };

    Object.entries(sideScenarios).forEach(([side, slot]) => {
      describe(`when 'side' is set to '${side}'`, () => {
        it(`should render swipeActions in the correct slot`, () => {});
      });
    });

    it('should render an ion-item-option for each swipeAction', () => {});

    // TODO: Maybe not test this? Too far in the metal.
    it('should evaluate swipeActions given as functions', () => {});

    it('should not evaluate swipeActions.onSelected');

    it('should render buttons with correct width', () => {});

    it('should not render disabled swipeActions', () => {});

    it('should SOMETHING ABOUT DEFAULT TYPE HERE', () => {});

    const swipeActionTypesScenarios: { [key in ListSwipeActionType]: string } = {
      warning: '#000',
      success: '#000',
      danger: '#000',
    };

    Object.entries(swipeActionTypesScenarios).forEach(([type, color]) => {
      describe(`when a swipeAction has type ${type}`, () => {
        it('should render with correct background color', () => {});
      });
    });

    describe('when a swipeAction is clicked', () => {
      it('should evaluate onSelected', () => {});
    });

    describe('when a swipeAction has an icon', () => {
      it('should render the correct icon', () => {});

      it('should render the icon in the correct slot', () => {});

      it('should render the title', () => {});

      describe('and it is custom', () => {
        it('should render the custom icon', () => {});
      });
    });

    it('should render the title for each swipeAction', () => {});

    it('should render swipeAction titles with correct typography', () => {});

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
        it('should use the result of the function for the property', () => {});
      });
    });
  });
});
