import { IonItem, IonRadio, IonRadioGroup } from '@ionic/angular/standalone';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MockComponents } from 'ng-mocks';

import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';

import { TestHelper } from '@kirbydesign/designsystem/testing';

import { ItemComponent } from '@kirbydesign/designsystem/item';
import { RadioGroupComponent } from './radio-group/radio-group.component';
import { RadioComponent } from './radio.component';

const { getColor, size } = DesignTokenHelper;

describe('RadioComponent in Item', () => {
  let spectator: SpectatorHost<RadioComponent>;
  let ionRadio: HTMLIonRadioElement;

  const createHost = createHostFactory({
    component: RadioComponent,
    declarations: MockComponents(ItemComponent, IonItem, IonRadio, IonRadioGroup),
  });

  describe('by default', () => {
    beforeEach(() => {
      spectator = createHost(`
    <kirby-item>
      <kirby-radio></kirby-radio>
    </kirby-item>`);
      ionRadio = spectator.query('ion-radio');
    });

    it(`icon should not have any margin`, () => {
      expect(ionRadio).toHaveComputedStyle({
        margin: '0px',
      });
    });

    it(`should have z-index`, () => {
      expect(spectator.element).toHaveComputedStyle({
        'z-index': '1',
      });
    });
  });

  describe('slotted start', () => {
    beforeEach(() => {
      spectator = createHost(`
    <kirby-item>
      <kirby-radio slot="start"></kirby-radio>
    </kirby-item>`);
    });

    it(`should have correct vertical spacing`, () => {
      expect(spectator.element).toHaveComputedStyle({
        'margin-inline-end': size('xs'),
      });
    });
  });
});

describe('RadioComponent in RadioGroup', () => {
  let spectator: SpectatorHost<RadioGroupComponent>;
  let ionRadio: HTMLIonRadioElement;
  let radioIcon: HTMLElement;

  const createHost = createHostFactory({
    component: RadioGroupComponent,
    declarations: [RadioComponent],
    imports: [TestHelper.ionicModuleForTest],
  });

  describe('when radio group hasError=true', () => {
    beforeEach(async () => {
      spectator = createHost(`
    <kirby-radio-group [hasError]="true">
      <kirby-radio></kirby-radio>
    </kirby-radio-group>`);
      const ionRadioGroupElement = spectator.query('ion-radio-group');
      await TestHelper.whenReady(ionRadioGroupElement);
      ionRadio = spectator.query('ion-radio');
      await TestHelper.whenReady(ionRadio);
      radioIcon = ionRadio.shadowRoot.querySelector('[part=container]');
    });

    it('should have correct border style', () => {
      expect(radioIcon).toHaveComputedStyle({
        'border-width': '1px',
        'border-color': getColor('danger'),
      });
    });
  });
});
