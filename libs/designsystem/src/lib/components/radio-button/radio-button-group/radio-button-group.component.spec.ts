import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonRadioGroup } from '@ionic/angular';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { RadioButtonGroupComponent } from './radio-button-group.component';
import { RadioButtonComponent } from '../radio-button.component';
import { ItemComponent, LabelComponent } from '../../item';
import { TestHelper } from '../../../testing/test-helper';

describe('RadioButtonGroupComponent', () => {
  const createHost = createHostFactory({
    component: RadioButtonGroupComponent,
    declarations: [RadioButtonComponent, ItemComponent, LabelComponent],
    imports: [
      IonicModule.forRoot({ mode: 'ios', _testing: true }),
      FormsModule,
      ReactiveFormsModule,
    ],
  });

  describe('used with plain binding', () => {
    let spectator: SpectatorHost<
      RadioButtonGroupComponent,
      { items: string[]; selected: string; disabled: boolean }
    >;
    let ionRadioGroup: IonRadioGroup;
    let ionRadioElements: HTMLIonRadioElement[];

    beforeEach(async () => {
      spectator = createHost(
        `<kirby-radio-button-group [disabled] [(value)]="selected">
        <kirby-item *ngFor="let item of items" selectable="true">
          <kirby-radio-button [value]="item" slot="start"></kirby-radio-button>
          <kirby-label>{{item}}</kirby-label>
        </kirby-item>
      </kirby-radio-button-group>`,
        {
          hostProps: {
            items: ['Larry', 'Curly', 'Moe'],
            selected: 'Curly',
            disabled: false,
          },
        }
      );

      ionRadioGroup = spectator.query(IonRadioGroup);
      const ionRadioGroupElement = spectator.query('ion-radio-group');
      await TestHelper.whenReady(ionRadioGroupElement);
      await TestHelper.setTimeoutAsync(); // Wait a tick for IonRadioGroup.value to be updated
      // Assert initial state:
      expect(ionRadioGroup.value).toBe('Curly');

      ionRadioElements = spectator.queryAll('ion-radio');
      expect(ionRadioElements).toHaveLength(3);
      await TestHelper.whenReady(ionRadioElements);
      // Assert initial state:
      expect(ionRadioElements[0].getAttribute('aria-checked')).toBe('false');
      expect(ionRadioElements[1].getAttribute('aria-checked')).toBe('true');
      expect(ionRadioElements[2].getAttribute('aria-checked')).toBe('false');
    });

    describe('selection', () => {
      it('should select an item by clicking upon the corresponding kirby-radio-button', () => {
        const radioButtons = spectator.queryAll('kirby-radio-button');
        spectator.click(radioButtons[0]);
        expect(spectator.hostComponent.selected).toEqual('Larry');
      });

      it('should update the selected kirby-radio-button when the value of the bound field is updated', async () => {
        spectator.setHostInput('selected', 'Moe');
        await TestHelper.setTimeoutAsync(); // Wait a tick for IonRadioGroup.value to be updated

        expect(ionRadioGroup.value).toEqual('Moe');
        expect(ionRadioElements[0].getAttribute('aria-checked')).toBe('false');
        expect(ionRadioElements[1].getAttribute('aria-checked')).toBe('false');
        expect(ionRadioElements[2].getAttribute('aria-checked')).toBe('true');
      });
    });

    describe('enablement', () => {
      it('should enable the kirby-radio-buttons when the kirby-radio-button-group is not disabled', () => {
        const radioButtons = spectator.queryAll(RadioButtonComponent);
        spectator.setInput('disabled', false);
        radioButtons.forEach((each) => expect(each.disabled).toBe(false));
      });

      it('should disable the kirby-radio-buttons when the kirby-radio-button-group is disabled', () => {
        const radioButtons = spectator.queryAll(RadioButtonComponent);
        spectator.setInput('disabled', true);
        radioButtons.forEach((each) => expect(each.disabled).toBe(true));
      });
    });
  });

  describe('used with template-driven form', () => {
    let spectator: SpectatorHost<RadioButtonGroupComponent, { items: string[]; selected: string }>;
    let ionRadioGroup: IonRadioGroup;
    let ionRadioElements: HTMLIonRadioElement[];

    beforeEach(async () => {
      spectator = createHost(
        `<kirby-radio-button-group [(ngModel)]="selected" required>
          <kirby-item *ngFor="let item of items" selectable="true">
            <kirby-radio-button [value]="item" slot="start"></kirby-radio-button>
            <kirby-label>{{item}}</kirby-label>
          </kirby-item>
        </kirby-radio-button-group>`,
        {
          hostProps: {
            items: ['Larry', 'Curly', 'Moe'],
            selected: 'Curly',
          },
        }
      );

      ionRadioGroup = spectator.query(IonRadioGroup);
      const ionRadioGroupElement = spectator.query('ion-radio-group');
      await TestHelper.whenReady(ionRadioGroupElement);
      await TestHelper.setTimeoutAsync(); // Wait a tick for IonRadioGroup.value to be set
      // Assert initial state:
      expect(ionRadioGroup.value).toBe('Curly');

      ionRadioElements = spectator.queryAll('ion-radio');
      expect(ionRadioElements).toHaveLength(3);
      await TestHelper.whenReady(ionRadioElements);
      // Assert initial state:
      expect(ionRadioElements[0].getAttribute('aria-checked')).toBe('false');
      expect(ionRadioElements[1].getAttribute('aria-checked')).toBe('true');
      expect(ionRadioElements[2].getAttribute('aria-checked')).toBe('false');
    });

    describe('selection', () => {
      it('should update the form value when clicking upon a kirby-radio-button', () => {
        const radioButtons = spectator.queryAll('kirby-radio-button');
        spectator.click(radioButtons[0]);
        expect(spectator.hostComponent.selected).toEqual('Larry');
      });

      it('should update the selected kirby-radio-button when the value of the form is updated', async () => {
        spectator.setHostInput('selected', 'Moe');
        await TestHelper.setTimeoutAsync(); // Wait a tick for IonRadioGroup.value to be updated

        expect(ionRadioGroup.value).toEqual('Moe');
        expect(ionRadioElements[0].getAttribute('aria-checked')).toBe('false');
        expect(ionRadioElements[1].getAttribute('aria-checked')).toBe('false');
        expect(ionRadioElements[2].getAttribute('aria-checked')).toBe('true');
      });
    });
  });

  describe('used with reactive form', () => {
    let spectator: SpectatorHost<RadioButtonGroupComponent, { form: FormGroup; items: string[] }>;
    let ionRadioGroup: IonRadioGroup;
    let ionRadioElements: HTMLIonRadioElement[];
    let control: FormControl;

    beforeEach(async () => {
      control = new FormControl();
      spectator = createHost(
        `<form [formGroup]="form">
        <kirby-radio-button-group formControlName="favoriteFood">
          <kirby-item *ngFor="let item of items" selectable="true">
            <kirby-radio-button [value]="item" slot="start"></kirby-radio-button>
            <kirby-label>{{item}}</kirby-label>
          </kirby-item>
        </kirby-radio-button-group>
      </form>`,
        {
          hostProps: {
            form: new FormGroup({
              favoriteFood: control,
            }),
            items: ['Larry', 'Curly', 'Moe'],
          },
        }
      );

      ionRadioGroup = spectator.query(IonRadioGroup);
      const ionRadioGroupElement = spectator.query('ion-radio-group');
      await TestHelper.whenReady(ionRadioGroupElement);
      await TestHelper.setTimeoutAsync(); // Wait a tick for IonRadioGroup.value to be set
      // Assert initial state:
      expect(ionRadioGroup.value).toBeNull();

      ionRadioElements = spectator.queryAll('ion-radio');
      expect(ionRadioElements).toHaveLength(3);
      await TestHelper.whenReady(ionRadioElements);
      // Assert initial state:
      expect(ionRadioElements[0].getAttribute('aria-checked')).toBe('false');
      expect(ionRadioElements[1].getAttribute('aria-checked')).toBe('false');
      expect(ionRadioElements[2].getAttribute('aria-checked')).toBe('false');
    });

    describe('selection', () => {
      it('should update the form control value when clicking upon a kirby-radio-button', async () => {
        const radioButtons = spectator.queryAll('kirby-radio-button');
        spectator.click(radioButtons[0]);

        expect(control.value).toBe('Larry');
      });

      it('should update the selected kirby-radio-button when the value of the form control is updated', async () => {
        control.setValue('Moe');
        await TestHelper.setTimeoutAsync(); // Wait a tick for IonRadioGroup.value to be set

        expect(ionRadioElements[0].getAttribute('aria-checked')).toBe('false');
        expect(ionRadioElements[1].getAttribute('aria-checked')).toBe('false');
        expect(ionRadioElements[2].getAttribute('aria-checked')).toBe('true');
      });
    });

    describe('enablement', () => {
      it('should enable the kirby-radio-buttons when the form control is not enabled', () => {
        control.enable();

        const radioButtons = spectator.queryAll(RadioButtonComponent);
        radioButtons.forEach((each) => expect(each.disabled).toBe(false));
      });

      it('should disable the kirby-radio-buttons when the form control is disabled', () => {
        control.disable();

        const radioButtons = spectator.queryAll(RadioButtonComponent);
        radioButtons.forEach((each) => expect(each.disabled).toBe(true));
      });
    });
  });
});
