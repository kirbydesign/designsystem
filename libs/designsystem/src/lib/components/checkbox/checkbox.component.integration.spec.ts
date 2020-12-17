import { SpectatorHost, createHostFactory } from '@ngneat/spectator';
import { IonCheckbox, IonItem } from '@ionic/angular';

import { DesignTokenHelper } from '../../helpers';
import { ItemComponent } from '../item';
import { CheckboxComponent } from './checkbox.component';

const checkboxIconSize = DesignTokenHelper.size('m');

describe('CheckboxComponent in Item', () => {
  let spectator: SpectatorHost<CheckboxComponent>;
  let ionCheckbox: HTMLIonCheckboxElement;

  const createHost = createHostFactory({
    component: CheckboxComponent,
    declarations: [ItemComponent, IonItem, IonCheckbox],
  });

  beforeEach(() => {
    spectator = createHost(`<kirby-item>
      <kirby-checkbox></kirby-checkbox>
    </kirby-item>`);
    ionCheckbox = spectator.query('ion-checkbox');
  });

  it(`should be sized to icon size`, () => {
    expect(ionCheckbox).toHaveComputedStyle({
      '--size': checkboxIconSize,
      padding: '0px',
    });
  });

  it(`should have z-index`, () => {
    expect(spectator.element).toHaveComputedStyle({
      'z-index': '1',
    });
  });
});
