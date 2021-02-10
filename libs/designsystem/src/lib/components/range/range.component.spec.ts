import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
  imports: [IonicModule.forRoot({ mode: 'ios', _testing: true })],
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
      declarations: [RangeComponent, IonRange],
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

  beforeEach(() => {
    spectator = createHost(
      `
        <kirby-range minLabel="Min" maxLabel="Max">
        <ion-range value="30" 
            ticks=true  step="1" 
            pin="true" snaps="true" max="42" min="30" 
       >
        </ion-range>
     </kirby-range>`
    );
  });

  it('should not be disabled', () => {
    expect(spectator.component.disabled).toBe(false);
  });
  it('should set disabled state', () => {
    spectator.component.ionRange.disabled = true;
    expect(spectator.component.disabled).toBe(true);
  });
  it('should set value', () => {
    expect(spectator.component.ionRange.value).toBe(30);
    const expectedValue = 35;
    spectator.component.ionRange.value = expectedValue;
    expect(spectator.component.ionRange.value).toBe(expectedValue);
  });
});

describe('RangeComponent design properties', () => {
  let spectator: Spectator<RangeComponent>;
  beforeEach(() => {
    spectator = createHost(
      `
        <kirby-range minLabel="Min" maxLabel="Max">
        <ion-range
            ticks=true  step="1"
            pin=true snaps=true max="25" min="1" 
       >
        </ion-range>
     </kirby-range>`
    );
  });
  it('to be correct', () => {
    //  expect(spectator.component.value).toBe('1');
    expect(spectator.component.ionRange.max.toString()).toBe('25');
    expect(spectator.component.ionRange.min.toString()).toBe('1');
    expect(spectator.component.ionRange.ticks).toBeTruthy();
    expect(spectator.component.ionRange.step.toString()).toBe('1');
    expect(spectator.component.ionRange.pin).toBeTruthy();
    expect(spectator.component.ionRange.snaps).toBeTruthy();
    expect(spectator.component.minLabel).toBe('Min');
    expect(spectator.component.maxLabel).toBe('Max');
  });
});

describe('Integration test of RangeComponent', () => {
  let spectator: SpectatorHost<RangeComponent>;
  let ionRangeElement: HTMLIonRangeElement;
  beforeEach(() => {
    spectator = createHost(`<kirby-range><ion-range></ion-range></kirby-range>`);
    ionRangeElement = spectator.query('ion-range');
  });

  it('can create spectator host and find ion range', () => {
    expect(spectator).not.toBeNull();
    expect(ionRangeElement).not.toBeNull();
  });
});

describe('Min and Max Label ', () => {
  let spectator: SpectatorHost<RangeComponent>;

  it('should not be present', () => {
    spectator = createHost(`<kirby-range><ion-range></ion-range></kirby-range>`);
    const minLabelElement = spectator.query('.min-label');
    const maxLabelElement = spectator.query('.max-label');
    expect(minLabelElement).toBeNull();
    expect(maxLabelElement).toBeNull();
  });

  it('should render the min and max labels with correct text', () => {
    spectator = createHost(
      `<kirby-range minLabel="min" maxLabel="max"><ion-range></ion-range></kirby-range>`
    );
    const minLabelElement = spectator.query('.min-label');
    const maxLabelElement = spectator.query('.max-label');
    expect(minLabelElement).not.toBeNull();
    expect(maxLabelElement).not.toBeNull();
    expect(minLabelElement.innerHTML).toBe('min');
    expect(maxLabelElement.innerHTML).toBe('max');
  });

  it('should verify the the disabled class is NOT applied', () => {
    spectator = createHost(
      `<kirby-range minLabel="min" maxLabel="max"><ion-range></ion-range></kirby-range>`
    );

    const minLabelElement = spectator.query('.min-label');
    const maxLabelElement = spectator.query('.max-label');
    expect(minLabelElement).not.toBeNull();
    expect(maxLabelElement).not.toBeNull();
    console.log(minLabelElement);
    expect(minLabelElement.classList.contains('disabled')).toBe(false);
    expect(maxLabelElement.classList.contains('disabled')).toBe(false);
  });

  it('should verify the the disabled class is applied', () => {
    spectator = createHost(
      `<kirby-range minLabel="min" maxLabel="max"><ion-range></ion-range></kirby-range>`
    );
    spectator.component.ionRange.disabled = true;
    spectator.detectChanges();

    const minLabelElement = spectator.query('.min-label');
    const maxLabelElement = spectator.query('.max-label');
    expect(minLabelElement).not.toBeNull();
    expect(maxLabelElement).not.toBeNull();
    console.log(minLabelElement);
    expect(minLabelElement.classList.contains('disabled')).toBe(true);
    expect(maxLabelElement.classList.contains('disabled')).toBe(true);
  });
});

describe('Default Styling of RangeComponent', () => {
  let spectator: SpectatorHost<RangeComponent>;
  beforeEach(() => {
    spectator = createHost(
      `<kirby-range minLabel="min" maxLabel="max"><ion-range></ion-range></kirby-range>`
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

  beforeEach(async () => {
    spectator = createHost(`<kirby-range><ion-range></ion-range></kirby-range>`);
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
