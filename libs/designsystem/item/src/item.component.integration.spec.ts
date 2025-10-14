import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { CheckboxComponent } from '@kirbydesign/designsystem/checkbox';
import { RadioComponent, RadioGroupComponent } from '@kirbydesign/designsystem/radio';
import { ToggleComponent } from '@kirbydesign/designsystem/toggle';
import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';
import { TestHelper } from '@kirbydesign/designsystem/testing';

import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { IonItem } from '@ionic/angular/standalone';
import { ItemComponent } from './item.component';
import { LabelComponent } from '.';

const { fontWeight } = DesignTokenHelper;

describe('ItemComponent integration', () => {
  let ionItem: HTMLElement;

  let spectator: SpectatorHost<ItemComponent>;
  const createHost = createHostFactory({
    component: ItemComponent,
    imports: [
      TestHelper.ionicModuleForTest,
      CheckboxComponent,
      RadioComponent,
      RadioGroupComponent,
      ToggleComponent,
      ButtonComponent,
      IonItem,
      LabelComponent,
    ],
  });

  describe('with kirby-label', () => {
    describe('selectable and selected', () => {
      let labelElements: Element[];

      beforeEach(async () => {
        spectator = createHost(
          `
        <kirby-item selectable="true" selected="true">
          <kirby-label>
            <p>Title</p>
            <p class="kirby-item-detail">Detail</p>
          </kirby-label>
          <kirby-label slot="end">
            <data>Value</data>
            <data class="kirby-item-detail">Detail</data>
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

      it('should render heading, data and paragraph elements with correct font-weight', () => {
        labelElements
          .filter((e) => !e.classList.contains('kirby-item-detail'))
          .forEach((e) => {
            expect(e).toHaveComputedStyle({ 'font-weight': fontWeight('bold') });
          });
      });

      it('should render detail data and paragraph elements with correct font-weight', () => {
        labelElements
          .filter((e) => !!e.classList.contains('kirby-item-detail'))
          .forEach((e) => {
            expect(e).toHaveComputedStyle({ 'font-weight': fontWeight('normal') });
          });
      });
    });
  });

  describe('when configured with selectable="true"', () => {
    const nestedInteractiveElements = ['kirby-checkbox', 'kirby-radio', 'kirby-toggle', 'button'];
    nestedInteractiveElements.forEach((element) => {
      it(`should not render native button when there is a nested ${element}`, async () => {
        const elementStartTag = element === 'button' ? 'button kirby-button' : element;

        spectator = createHost(`<kirby-item selectable="true">
          <${elementStartTag}></${element}>
        </kirby-item>
        `);
        ionItem = spectator.queryHost('ion-item');
        await TestHelper.whenReady(ionItem);

        const nativePart = ionItem.shadowRoot.querySelector('[part="native"]');
        expect(nativePart.tagName).not.toEqual('BUTTON');
      });
    });
  });
});
