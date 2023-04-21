import { createComponentFactory, createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';

import { TestHelper } from '@kirbydesign/designsystem/testing';

import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ListItemComponent, ListModule, ListSwipeAction } from 'list/src';
import { tick } from '@angular/core/testing';
import { ItemComponent } from './item.component';
import { ItemModule, LabelComponent } from '.';

@Component({
  selector: 'kirby-mock-item',
  template: `
    <ng-template #MockKirbyItem>
      <kirby-item>
        {{ item.text }}
      </kirby-item>
    </ng-template>

    <kirby-list-item
      #sutComponentRef
      [item]="item"
      [itemTemplate]="MockKirbyItem"
      [boundaryClass]="'first'"
      (swipeActionSelect)="onItemSelected($event)"
    ></kirby-list-item>
  `,
})
class MockKirbyItemComponent {
  @ViewChild('sutComponentRef') public sutComponentRef: ListItemComponent;
  public item = { text: 'I am an item' };

  public onItemSelected(item: any) {}
}

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

describe(`when in a list-item-menu`, () => {
  let spectator: SpectatorHost<MockKirbyItemComponent>;
  let sutComponent: ListItemComponent;
  let ionItem: HTMLElement;
  const createHost = createHostFactory({
    component: MockKirbyItemComponent,
    declarations: [MockKirbyItemComponent],
    imports: [ItemModule, ListModule],
    shallow: false,
  });

  beforeEach(async () => {
    spectator = createHost(`<kirby-mock-item></kirby-mock-item>`);
    await spectator.fixture.whenStable();
    sutComponent = spectator.component.sutComponentRef;

    sutComponent.swipeActions = [{ title: 'Action 1' }, { title: 'Action 2' }] as ListSwipeAction[];

    spectator.detectChanges();

    ionItem = spectator.query('ion-item');
    await TestHelper.whenReady(ionItem);
    expect(ionItem.shadowRoot).toBeTruthy();
  });

  it('should render the item', () => {
    expect(spectator.query('kirby-item')).toBeTruthy();
    expect(spectator.query('kirby-item')).toHaveText('I am an item');
  });

  it(`should render 'ion-item' with correct '--inner-padding-end'`, () => {
    const computedStyle = { '--inner-padding-end': '4px' };
    expect(spectator.query('ion-item')).toHaveComputedStyle(computedStyle);
  });

  it(`should render 'ion-item' with correct '--inner-padding-end'`, async () => {
    const itemInnerElement = ionItem.shadowRoot.querySelector('.item-inner');
    expect(itemInnerElement).toBeTruthy();

    const ionSafeAreaRightComputedStyle = { '--inner-padding-end': '4px' };
    const paddingRightComputedStyle = { 'padding-right': '8px' };

    expect(itemInnerElement).toHaveComputedStyle({
      ...ionSafeAreaRightComputedStyle,
      ...paddingRightComputedStyle,
    });
  });

  it(`should render 'ion-item' with 'part=native'`, () => {
    const partNative = ionItem.shadowRoot.querySelector('[part=native]');
    expect(partNative).toBeTruthy();

    expect(partNative).toHaveComputedStyle({
      'padding-right': '48px',
    });
  });
});
