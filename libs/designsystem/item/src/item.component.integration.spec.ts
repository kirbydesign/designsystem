import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { DesignTokenHelper, PlatformService } from '@kirbydesign/designsystem/helpers';
import { TestHelper } from '@kirbydesign/designsystem/testing';
import { ListComponent, ListModule, ListSwipeAction } from '@kirbydesign/designsystem/list';

import { ItemComponent } from './item.component';
import { ItemModule, LabelComponent } from '.';

const { fontWeight } = DesignTokenHelper;

describe('ItemComponent with LabelComponent', () => {
  let ionItem: HTMLElement;

  let spectator: SpectatorHost<ItemComponent>;
  const createHost = createHostFactory({
    component: ItemComponent,
    imports: [TestHelper.ionicModuleForTest],
    declarations: [LabelComponent],
  });

  describe('selectable and selected', () => {
    let labelElements: Element[];

    beforeEach(async () => {
      spectator = createHost(
        `
        <kirby-item selectable="true" selected="true">
          <kirby-label>
            <h3>Title</h3>
            <p detail>Detail</p>
          </kirby-label>
          <kirby-label slot="end">
            <data>Value</data>
            <data detail>Detail</data>
          </kirby-label>
        </kirby-item>
        `
      );
      ionItem = spectator.queryHost('ion-label');
      await TestHelper.whenReady(ionItem);
      labelElements = spectator.queryAll(
        'ion-item ion-label > :is(h1, h2, h3, h4, h5, h6, p, data)'
      );
    });

    it('should render general header, data and paragraph elements with correct font-weight', () => {
      labelElements
        .filter((e) => !e.attributes.getNamedItem('detail'))
        .forEach((e) => {
          expect(e).toHaveComputedStyle({ 'font-weight': fontWeight('bold') });
        });
    });

    it('should render detail data and paragraph elements with correct font-weight', () => {
      labelElements
        .filter((e) => !!e.attributes.getNamedItem('detail'))
        .forEach((e) => {
          expect(e).toHaveComputedStyle({ 'font-weight': fontWeight('normal') });
        });
    });
  });
});

describe(`when host class is 'menu-item'`, () => {
  let listSpectator: SpectatorHost<ListComponent>;

  const defaultSwipeAction: ListSwipeAction = {
    position: 'left',
    title: 'Archive',
    type: 'warning',
    onSelected: (item) => null,
    isDisabled: (_item: any) => false,
  };

  const mockPlatformServiceIsTouchFalse = {
    isTouch: () => false,
    isTablet: () => false,
  };

  const createHost = createHostFactory({
    component: ListComponent,
    imports: [TestHelper.ionicModuleForTest, ListModule, ItemModule],
    declarations: [LabelComponent],
    providers: [{ provide: PlatformService, useValue: mockPlatformServiceIsTouchFalse }],
  });
  beforeEach(async () => {
    listSpectator = createHost(
      `
      <kirby-list (itemSelect)="($event)">
        <kirby-item *kirbyListItemTemplate="let item">
          <div slot="outside">
            <div class="flag success" *ngIf="item.flagged"></div>
            <div class="flag warning" *ngIf="item.archived"></div>
          </div>
          <h3>{{ item.title }}</h3>
          <data slot="end" class="kirby-text-bold">{{ item.amount }}</data>
        </kirby-item>
      </kirby-list>
      `,
      {
        props: {
          items: [{ name: 'Item1' }],
          swipeActions: [defaultSwipeAction],
        },
      }
    );
  });

  it('should create', () => {
    expect(listSpectator.component).toBeTruthy();
  });

  it('should be a menu action list', () => {
    expect(listSpectator.query('kirby-list-item-menu')).toBeTruthy();
    expect(listSpectator.query('.menu-item')).toBeTruthy();
  });

  describe('inner padding-right', () => {
    it('should be 4px when inside a menu', async () => {
      const elementWithMenuItemClass = listSpectator.query('.menu-item');
      expect(elementWithMenuItemClass).toBeTruthy();

      const ionItem = listSpectator.query('ion-item');
      expect(ionItem).toBeTruthy();

      await TestHelper.whenReady(ionItem);
      const itemInnerClass = ionItem.shadowRoot.querySelector('.item-inner');
      expect(itemInnerClass).toBeTruthy();

      expect(itemInnerClass).toHaveComputedStyle({
        'padding-right': '4px',
      });
    });
  });

  it(`should have 'flex-grow: 1'`, () => {
    expect(listSpectator.query('kirby-item')).toHaveComputedStyle({ 'flex-grow': '1' });
  });
});
