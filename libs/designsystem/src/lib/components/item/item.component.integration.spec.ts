import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { IonicModule } from '@ionic/angular';

import { TestHelper } from '../../testing/test-helper';
import { DesignTokenHelper } from '../../helpers';
import { ItemComponent } from './item.component';
import {
  ListComponent,
  InfiniteScrollDirective,
  ListItemTemplateDirective,
  ListItemColorDirective,
  SpinnerComponent,
  IconComponent,
  CardComponent,
} from '..';

const size = DesignTokenHelper.size;

describe('ItemComponent in Kirby List', () => {
  let ionList: HTMLElement;
  let itemsInList: HTMLElement[];

  let spectator: SpectatorHost<ListComponent>;
  const createHost = createHostFactory({
    component: ListComponent,
    imports: [IonicModule.forRoot({ mode: 'ios', _testing: true })],
    declarations: [
      ItemComponent,
      SpinnerComponent,
      IconComponent,
      CardComponent,
      InfiniteScrollDirective,
      ListItemColorDirective,
      ListItemTemplateDirective,
    ],
  });

  describe('inside list', () => {
    beforeEach(async () => {
      spectator = createHost<ListComponent>(
        `
        <kirby-list [items]="[{ name: 'Item1' }, { name: 'Item2' }, { name: 'Item3' }]">
          <kirby-item *kirbyListItemTemplate="let item">{{ item.name }}</kirby-item>
        </kirby-list>
        `
      );
      ionList = spectator.queryHost('ion-list');
      await TestHelper.whenReady(ionList);
      itemsInList = spectator.queryAll('ion-list ion-item');
    });

    it('should create list wrapper', () => {
      expect(spectator).toBeTruthy();
    });

    it('should create items in list', () => {
      expect(itemsInList).toBeTruthy();
    });

    it('should render first and last item with correct padding', async () => {
      const firstItem = itemsInList[0].shadowRoot.querySelector('.item-native');
      const lastItem = itemsInList[itemsInList.length - 1].shadowRoot.querySelector('.item-native');
      expect(firstItem).toHaveComputedStyle({ 'padding-top': size('xxs') });
      expect(lastItem).toHaveComputedStyle({ 'padding-bottom': size('xxs') });
    });
  });

  describe('inside list with cards', () => {
    beforeEach(async () => {
      spectator = createHost<ListComponent>(
        `
        <kirby-list [items]="[{ name: 'Item1' }, { name: 'Item2' }, { name: 'Item3' }]">
          <kirby-card *kirbyListItemTemplate="let item">
            <kirby-item>{{ item.name }}</kirby-item>
          </kirby-card>
        </kirby-list>
        `
      );
      ionList = spectator.queryHost('ion-list');
      await TestHelper.whenReady(ionList);
      itemsInList = spectator.queryAll('ion-list ion-item');
    });

    it('should create list wrapper', () => {
      expect(spectator).toBeTruthy();
    });

    it('should render items in cards in list', () => {
      expect(itemsInList).toBeTruthy();
    });

    it('should render first and last item without padding top/bottom', async () => {
      const firstItem = itemsInList[0].shadowRoot.querySelector('.item-native');
      const lastItem = itemsInList[itemsInList.length - 1].shadowRoot.querySelector('.item-native');
      expect(firstItem).toHaveComputedStyle({ 'padding-top': '0px' });
      expect(lastItem).toHaveComputedStyle({ 'padding-bottom': '0px' });
    });
  });
});
