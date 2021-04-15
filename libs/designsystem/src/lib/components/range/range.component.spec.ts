/*import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonRange } from '@ionic/angular';
import {
  createComponentFactory,
  createHostFactory,
  Spectator,
  SpectatorHost,
} from '@ngneat/spectator';

import { DesignTokenHelper } from '../../helpers';
import { TestHelper } from '../../testing/test-helper';
import { WindowRef } from '../../types';

import { RangeComponent } from './range.component';

const size = DesignTokenHelper.size;

const createComponent = createComponentFactory({
  component: RangeComponent,
  declarations: [RangeComponent, IonRange],
});
const createHost = createHostFactory({
  component: RangeComponent,
  declarations: [RangeComponent, IonRange],
  imports: [FormsModule, ReactiveFormsModule, IonicModule.forRoot({ mode: 'ios', _testing: true })],
  providers: [
    {
      provide: WindowRef,
      useValue: window,
    },
  ],
});

describe('RangeComponent', () => {
  let component: RangeComponent;
  let fixture: ComponentFixture<RangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RangeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

describe('RangeComponent default properties', () => {
  let spectator: Spectator<RangeComponent>;
  let testFormControl: FormControl;

  beforeEach(() => {
    testFormControl = new FormControl('');
    spectator = createHost(
      `
        <kirby-range minLabel="Min" maxLabel="Max" 
                    ticks=true  step="1" 
            pin="true" snaps="true" max="42" min="30" [formControl]="testFormControl">
     </kirby-range>`,
      {
        hostProps: { testFormControl },
      }
    );
  });

  it('should not be disabled', () => {
    spectator.component.disabled = false;
    expect(spectator.component.disabled).toBe(false);
  });
  it('should set disabled state', () => {
    spectator.component.disabled = true;
    expect(spectator.component.disabled).toBe(true);
  });

  it('should set value', () => {
    testFormControl.setValue(30);
    spectator.detectChanges();
    expect(spectator.component.value).toBe(30);

    const expectedValue = 35;
    spectator.component.value = expectedValue;
    expect(spectator.component.value).toBe(expectedValue);
  });
});

describe('RangeComponent design properties', () => {
  let spectator: Spectator<RangeComponent>;
  let testFormControl: FormControl;
  beforeEach(() => {
    testFormControl = new FormControl('');
    spectator = createHost(
      `
        <kirby-range minLabel="Min" maxLabel="Max"  ticks=true  step="1"
            pin=true snaps=true max="25" min="1" [formControl]="testFormControl">
     </kirby-range>`,
      {
        hostProps: { testFormControl },
      }
    );
  });
  it('should have correct properties', () => {
    testFormControl.setValue(30);
    spectator.detectChanges();
    expect(spectator.component.max.toString(10)).toBe('25');
    expect(spectator.component.min.toString(10)).toBe('1');
    expect(spectator.component.ticks).toBeTruthy();
    expect(spectator.component.step.toString(10)).toBe('1');
    expect(spectator.component.pin).toBeTruthy();
    expect(spectator.component.snaps).toBeTruthy();
    expect(spectator.component.minLabel).toBe('Min');
    expect(spectator.component.maxLabel).toBe('Max');
  });
});

describe('Integration test of RangeComponent', () => {
  let spectator: SpectatorHost<RangeComponent>;
  let ionRangeElement: HTMLIonRangeElement;
  let testFormControl: FormControl;
  beforeEach(() => {
    testFormControl = new FormControl('');
    spectator = createHost(`<kirby-range></kirby-range>`, {
      hostProps: { testFormControl },
    });
    ionRangeElement = spectator.query('ion-range');
  });

  it('can create spectator host and find ion range', () => {
    expect(spectator).not.toBeNull();
    expect(ionRangeElement).not.toBeNull();
  });
});

describe('Min and Max Label ', () => {
  let spectator: SpectatorHost<RangeComponent>;
  let testFormControl: FormControl;

  it('should not be present', () => {
    testFormControl = new FormControl('');

    spectator = createHost(`<kirby-range></kirby-range>`, {
      hostProps: { testFormControl },
    });
    const minLabelElement = spectator.query('.min-label');
    const maxLabelElement = spectator.query('.max-label');
    expect(minLabelElement).toBeNull();
    expect(maxLabelElement).toBeNull();
  });

  it('should render the min and max labels with correct text', () => {
    testFormControl = new FormControl('');
    spectator = createHost(
      `<kirby-range minLabel="min" maxLabel="max" [formControl]="testFormControl"></kirby-range>`,
      {
        hostProps: { testFormControl },
      }
    );

    spectator.detectChanges();

    const minLabelElement = spectator.query('.min-label');
    const maxLabelElement = spectator.query('.max-label');

    expect(minLabelElement).not.toBeNull();
    expect(maxLabelElement).not.toBeNull();
    expect(minLabelElement.innerHTML).toBe('min');
    expect(maxLabelElement.innerHTML).toBe('max');
  });

  it('should verify that the disabled class is NOT applied', () => {
    testFormControl = new FormControl('');
    spectator = createHost(
      `<kirby-range minLabel="min" maxLabel="max" [formControl]="testFormControl"></kirby-range>`,
      {
        hostProps: { testFormControl },
      }
    );

    const minLabelElement = spectator.query('.min-label');
    const maxLabelElement = spectator.query('.max-label');
    expect(minLabelElement).not.toBeNull();
    expect(maxLabelElement).not.toBeNull();
    console.log(minLabelElement);
    expect(minLabelElement.classList.contains('disabled')).toBe(false);
    expect(maxLabelElement.classList.contains('disabled')).toBe(false);
  });

  it('should verify that the disabled class is NOT applied using formcontrol value', () => {
    testFormControl = new FormControl({ value: '42', disabled: false });
    spectator = createHost(
      `<kirby-range minLabel="min" maxLabel="max" [formControl]="testFormControl"></kirby-range>`,
      {
        hostProps: { testFormControl },
      }
    );
    const minLabelElement = spectator.query('.min-label');
    const maxLabelElement = spectator.query('.max-label');
    expect(minLabelElement).not.toBeNull();
    expect(maxLabelElement).not.toBeNull();
    console.log(minLabelElement);
    expect(minLabelElement.classList.contains('disabled')).toBe(false);
    expect(maxLabelElement.classList.contains('disabled')).toBe(false);
  });

  it('should verify the the disabled class is applied using formcontrol value', () => {
    testFormControl = new FormControl({ value: '42', disabled: true });

    spectator = createHost(
      `<kirby-range minLabel="min" maxLabel="max" [formControl]="testFormControl"></kirby-range>`,
      {
        hostProps: { testFormControl },
      }
    );
    spectator.detectChanges();

    const minLabelElement = spectator.query('.min-label');
    const maxLabelElement = spectator.query('.max-label');
    expect(minLabelElement).not.toBeNull();
    expect(maxLabelElement).not.toBeNull();
    expect(minLabelElement.classList.contains('disabled')).toBe(true);
    expect(maxLabelElement.classList.contains('disabled')).toBe(true);
  });
});

describe('Default Styling of RangeComponent', () => {
  let spectator: SpectatorHost<RangeComponent>;
  let testFormControl: FormControl;
  beforeEach(() => {
    testFormControl = new FormControl('');
    spectator = createHost(
      `<kirby-range minLabel="min" maxLabel="max" [formControl]="testFormControl"></kirby-range>`,
      {
        hostProps: { testFormControl },
      }
    );
  });

  it('range container should have correct padding', () => {
    const container = spectator.queryHost('.range-container');
    expect(container).not.toBeNull();
    expect(container).toHaveComputedStyle({
      'padding-left': size('s'),
      'padding-right': size('s'),
      'padding-top': size('xxs'),
      'padding-bottom': size('xxs'),
    });
  });
});

describe('Ion-Range', () => {
  let spectator: SpectatorHost<RangeComponent>;
  let ionRangeElement: HTMLIonRangeElement;
  let testFormControl: FormControl;

  beforeEach(async () => {
    testFormControl = new FormControl('');
    spectator = createHost(`<kirby-range [formControl]="testFormControl"></kirby-range>`, {
      hostProps: { testFormControl },
    });
    ionRangeElement = spectator.query('ion-range');
    // await TestHelper.whenReady(ionRangeElement);
    await TestHelper.whenTrue(() => ionRangeElement.shadowRoot !== null, 10000, 1);
  });

  it('should have shadow DOM', () => {
    expect(ionRangeElement.shadowRoot).not.toBeNull();
  });

  it('ionRange tick should have correct styling', () => {
    const ticks = ionRangeElement.shadowRoot.querySelectorAll('.range-tick'); // [part=tick]
    expect(ticks).not.toBeNull();
    ticks.forEach((tick) => {
      expect(tick).toHaveComputedStyle({
        'z-index': '1',
        'border-radius': '50%',
      });
    });
  });
  it('ionRange tick active should have correct styling', () => {
    const ticks = ionRangeElement.shadowRoot.querySelectorAll('.range-tick-active'); // [part=tick-active]
    expect(ticks).not.toBeNull();
    ticks.forEach((tick) => {
      expect(tick).toHaveComputedStyle({
        'z-index': '1',
        'border-radius': '50%',
      });
    });
  });
});
*/
