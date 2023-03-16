import { IonicModule } from '@ionic/angular';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { ListItem } from '../list-item/list-item';
import { ListSwipeAction } from '../list-swipe-action.type';

import { ListItemSwipeComponent } from './list-item-swipe.component';

fdescribe('ListItemSwipeComponent', () => {
  let spectator: SpectatorHost<ListItemSwipeComponent>;

  const createHost = createHostFactory({
    component: ListItemSwipeComponent,
    declarations: [kirbyListItemColor],
    imports: [IonicModule.forRoot()],
  });

  const item: ListItem = {
    id: 0,
    title: 'Vestas Wind Systems',
    subTitle: '2000 pcs',
    amount: '5.587.218.309 DKK',
    detail: 225,
    flagged: false,
    color: 'default',
  };

  const defaultSwipeAction: ListSwipeAction = {
    position: 'left',
    title: 'Archive',
    type: 'warning',
    onSelected: (item) => null,
    isDisabled: (_item: ListItem) => false,
  };

  describe('has 1 swipe action', () => {
    let swipeActions: ListSwipeAction[];

    beforeEach(async () => {
      swipeActions = [{ ...defaultSwipeAction }];
      spectator = createHost(`<kirby-list-item-swipe></kirby-list-item-swipe>`, {
        props: { item, swipeActions },
      });
    });

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
      expect(spectator.query('ion-item-sliding')).toBeTruthy();
    });

    it('should have the configured action title', () => {
      expect(spectator.component.item.title).toEqual(item.title);
      spectator.detectChanges();

      const swipeActionTitle = swipeActions[0].title;

      expect(spectator.query('ion-item-options')).toContainText(swipeActionTitle as string);
    });

    it('should have one swipe action', () => {
      spectator.detectChanges();

      expect(spectator.queryAll('ion-item-option')).toHaveLength(1);
    });

    it('should have the configured action type', () => {
      spectator.detectChanges();

      const swipeActionType = swipeActions[0].type;

      expect(spectator.query('ion-item-option')).toHaveClass(`${swipeActionType}`);
    });
  });

  describe('has 2 swipe actions', () => {
    let swipeActions: ListSwipeAction[];
    beforeEach(async () => {
      swipeActions = [{ ...defaultSwipeAction }, { ...defaultSwipeAction }];
      spectator = createHost(`<kirby-list-item-swipe></kirby-list-item-swipe>`, {
        props: { item, swipeActions },
      });
    });

    it('should have two swipe actions', () => {
      spectator.detectChanges();

      expect(spectator.queryAll('ion-item-option')).toHaveLength(2);
    });
  });

  describe(`Swipe action 'isDisabled' is true`, () => {
    let swipeActions: ListSwipeAction[];
    beforeEach(async () => {
      swipeActions = [{ ...defaultSwipeAction, isDisabled: (_item: ListItem) => true }];
      spectator = createHost(`<kirby-list-item-swipe></kirby-list-item-swipe>`, {
        props: { item, swipeActions },
      });
    });

    it('should not have any swipe actions', () => {
      spectator.detectChanges();

      expect(spectator.queryAll('ion-item-option')).toHaveLength(0);
    });
  });

  describe(`Swipe action 'isDisabled' is true for action 2 `, () => {
    let swipeActions: ListSwipeAction[];
    beforeEach(async () => {
      swipeActions = [
        { ...defaultSwipeAction },
        { ...defaultSwipeAction, isDisabled: (_item: ListItem) => true },
      ];
      spectator = createHost(`<kirby-list-item-swipe></kirby-list-item-swipe>`, {
        props: { item, swipeActions },
      });
    });

    it('should have 1 swipe action', () => {
      spectator.detectChanges();

      expect(spectator.queryAll('ion-item-option')).toHaveLength(1);
    });
  });
});
