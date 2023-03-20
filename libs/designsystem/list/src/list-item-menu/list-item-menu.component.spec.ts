import { IonicModule } from '@ionic/angular';
import {
  createHostFactory,
  HostComponent,
  SpectatorHost,
  SpectatorHostFactory,
} from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';

import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { AvatarComponent } from '@kirbydesign/designsystem/avatar';
import { ItemModule } from '@kirbydesign/designsystem/item';

import { ListItem } from '../list-item/list-item';
import { GetActionsPipe } from '../list-item/pipes/get-actions/get-actions.pipe';
import { HasActionsPipe } from '../list-item/pipes/has-actions/has-actions.pipe';
import { GetActionIconPipe } from '../list-item/pipes/get-action-icon/get-action-icon.pipe';
import { ListItemMenuComponent } from './list-item-menu.component';
import { ListItemMenuAction } from './list-item-menu-action';

describe('ListItemMenuComponent', () => {
  let spectator: SpectatorHost<ListItemMenuComponent>;
  let createHost: SpectatorHostFactory<ListItemMenuComponent, HostComponent>;

  const item: ListItem = {
    id: 0,
    title: 'Vestas Wind Systems',
    subTitle: '2000 pcs',
    amount: '5.587.218.309 DKK',
    detail: 225,
    flagged: false,
    color: 'default',
  };

  const defaultAction: ListItemMenuAction = {
    icon: 'person',
    text: 'Person',
    isDisabled: (_item: ListItem) => false,
    onSelected: (_item: ListItem) => null,
  };

  createHost = createHostFactory({
    component: ListItemMenuComponent,
    declarations: [HasActionsPipe, GetActionsPipe, GetActionIconPipe, MockComponent(IconComponent)],
    imports: [IonicModule.forRoot(), ButtonComponent, AvatarComponent, ItemModule],
  });

  describe('component is created', () => {
    beforeEach(async () => {
      spectator = createHost(`<kirby-list-item-menu></kirby-list-item-menu>`, {
        props: { item },
      });
    });

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });

    it('should have the configured item title', () => {
      expect(spectator.component.item.title).toEqual(item.title);
      expect(spectator.query('kirby-item  h3')).toContainText(item.title);
    });

    it('should have the configured item amount', () => {
      expect(spectator.component.item.amount).toEqual(item.amount);
      expect(spectator.query('kirby-item data')).toContainText(item.amount);
    });
  });

  describe('has 1 action', () => {
    let actions: ListItemMenuAction[];
    let oneActionSpectator: SpectatorHost<ListItemMenuComponent>;

    beforeEach(async () => {
      actions = [{ ...defaultAction }];
      oneActionSpectator = createHost(`<kirby-list-item-menu></kirby-list-item-menu>`, {
        props: { item, actions: actions },
      });
    });

    it('should have action menu', () => {
      oneActionSpectator.detectChanges();

      expect(oneActionSpectator.query('kirby-item button[kirby-button]')).not.toBeNull();
    });

    it('should have action button with its own icon', () => {
      const moreIcon = oneActionSpectator.query('button[kirby-button] kirby-icon');
      expect(moreIcon).toBeTruthy();
      console.log(moreIcon);

      oneActionSpectator.detectChanges();

      expect(moreIcon).toHaveAttribute('ng-reflect-name', actions[0].icon as string);
    });
  });

  describe('has 2 actions, one is disabled', () => {
    let actions: ListItemMenuAction[];
    let twoActionsSpectator: SpectatorHost<ListItemMenuComponent>;

    beforeEach(async () => {
      actions = [{ ...defaultAction }, { ...defaultAction, text: '2' }];
      twoActionsSpectator = createHost(`<kirby-list-item-menu></kirby-list-item-menu>`, {
        props: { item, actions: actions },
      });
    });

    it(`should have a 'more' button`, () => {
      twoActionsSpectator.detectChanges();

      const moreIcons = twoActionsSpectator.queryAll('kirby-item button[kirby-button] kirby-icon');

      expect(moreIcons).toHaveLength(1);

      expect(moreIcons).toHaveAttribute('ng-reflect-name', 'more');
    });
  });
});
