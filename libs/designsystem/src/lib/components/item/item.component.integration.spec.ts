import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';

import { TestHelper } from '@kirbydesign/designsystem/testing';
import { IconComponent } from '..';

import { ItemComponent } from './item.component';
import { LabelComponent } from '.';

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
