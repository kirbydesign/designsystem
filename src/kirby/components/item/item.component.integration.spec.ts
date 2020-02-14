import { SpectatorHost, createHostFactory } from '@ngneat/spectator';
import { IonicModule } from '@ionic/angular';

import { TestHelper } from '../../testing/test-helper';
import { DesignTokenHelper } from '../../helpers/design-token-helper';
import {
  ListComponent,
  InfiniteScrollDirective,
  ListItemTemplateDirective,
} from '@kirbydesign/designsystem/list';
import { ItemComponent } from './item.component';
import { SpinnerComponent, IconComponent, CardComponent } from '@kirbydesign/designsystem';
import { ListItemColorDirective } from '../list/directives/list-item-color.directive';

const size = DesignTokenHelper.size;

describe('ItemComponent in Kirby List', () => {
  let ionList: HTMLElement;
  let itemsInList: HTMLElement[];

  let spectator: SpectatorHost<ListComponent>;
  const createHost = createHostFactory({
    component: ListComponent,
    imports: [IonicModule.forRoot()],
    declarations: [
      ItemComponent,
      ListComponent,
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
      await TestHelper.whenHydrated(ionList);
      itemsInList = spectator.queryAll('ion-list ion-item');
    });

    it('should create list wrapper', () => {
      expect(spectator).toBeTruthy();
    });

    it('should items in list', () => {
      expect(itemsInList).toBeTruthy();
    });

    it(`should render first with padding top ${size(
      'xxs'
    )} and last item with padding bottom ${size('xxs')}`, async () => {
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
      await TestHelper.whenHydrated(ionList);
      itemsInList = spectator.queryAll('ion-list ion-item');
    });

    it('should create list wrapper', () => {
      expect(spectator).toBeTruthy();
    });

    it('should render items in cards in list', () => {
      expect(itemsInList).toBeTruthy();
    });

    it(`should render first with padding top 0px and last item with padding bottom 0px`, async () => {
      const firstItem = itemsInList[0].shadowRoot.querySelector('.item-native');
      const lastItem = itemsInList[itemsInList.length - 1].shadowRoot.querySelector('.item-native');
      expect(firstItem).toHaveComputedStyle({ 'padding-top': '0px' });
      expect(lastItem).toHaveComputedStyle({ 'padding-bottom': '0px' });
    });
  });
});
