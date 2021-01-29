import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonRange } from '@ionic/angular';
import {
  createComponentFactory,
  createHostFactory,
  Spectator,
  SpectatorHost,
} from '@ngneat/spectator';

import { DesignTokenHelper } from '../../helpers';
import { TestHelper } from '../../testing/test-helper';

import { RangeComponent } from './range.component';

const size = DesignTokenHelper.size;

const createComponent = createComponentFactory({
  component: RangeComponent,
  declarations: [RangeComponent, IonRange],
});
const createHost = createHostFactory({
  component: RangeComponent,
  declarations: [RangeComponent, IonRange],
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
    spectator = createComponent({
      props: { value: 30, min: 30, max: 42 },
    });
  });

  it('should not be disabled', () => {
    expect(spectator.component.disabled).toBe(false);
  });
  it('should set disabled state', () => {
    spectator.component.setDisabledState(true);
    expect(spectator.component.disabled).toBe(true);
  });
  it('should set value', () => {
    expect(spectator.component.value).toBe(30);
    const expectedValue = 35;
    spectator.component.value = expectedValue;
    expect(spectator.component.value).toBe(expectedValue);
  });

  it('should set value and react to change event', () => {
    expect(spectator.component.value).toBe(30);
    const expectedValue = 40;
    let value = 0;
    spectator.component.valueChange.subscribe((v) => (value = v));
    spectator.component.value = expectedValue;
    expect(value).toBe(expectedValue);
  });

  it('should set value using @Input() and react to change event', () => {
    expect(spectator.component.value).toBe(30);
    const expectedValue = 42;
    let value = 0;
    spectator.component.valueChange.subscribe((v) => (value = v));
    spectator.setInput('value', expectedValue);
    expect(value).toBe(expectedValue);
  });
});

describe('RangeComponent design properties', () => {
  let spectator: Spectator<RangeComponent>;
  beforeEach(() => {
    spectator = createHost(
      `<kirby-range ticks="5" step="1" snaps="true" pin="true" minLabel="Min" maxLabel="Max" max="5" min="1"></kirby-range>`
    );
  });
  it('to be correct', () => {
    //  expect(spectator.component.value).toBe('1');
    expect(spectator.component.max.toString()).toBe('5');
    expect(spectator.component.min.toString()).toBe('1');
    expect(spectator.component.ticks.toString()).toBe('5');
    expect(spectator.component.step.toString()).toBe('1');
    expect(spectator.component.minLabel).toBe('Min');
    expect(spectator.component.maxLabel).toBe('Max');
    expect(spectator.component.pin).toBe(true);
    expect(spectator.component.snaps).toBe(true);
  });
});

describe('Integration test of RangeComponent', () => {
  let spectator: SpectatorHost<RangeComponent>;
  let ionRangeElement: HTMLIonRangeElement;
  beforeEach(async () => {
    spectator = createHost(`<kirby-range></kirby-range>`);
    ionRangeElement = spectator.query('ion-range');
    await TestHelper.whenReady(ionRangeElement);
  });

  it('can create spectator host and find ion range', async () => {
    expect(spectator).not.toBeNull();
    expect(ionRangeElement).not.toBeNull();
  });
});

describe('Min and Max Label ', () => {
  let spectator: SpectatorHost<RangeComponent>;

  it('should not be present', () => {
    spectator = createHost(`<kirby-range></kirby-range>`);
    const minLabelElement = spectator.query('.min-label');
    const maxLabelElement = spectator.query('.max-label');
    expect(minLabelElement).toBeNull();
    expect(maxLabelElement).toBeNull();
  });

  it('should render the min and max labels with correct text', () => {
    spectator = createHost(`<kirby-range minLabel="min" maxLabel="max"></kirby-range>`);
    const minLabelElement = spectator.query('.min-label');
    const maxLabelElement = spectator.query('.max-label');
    expect(minLabelElement).not.toBeNull();
    expect(maxLabelElement).not.toBeNull();
    expect(minLabelElement.innerHTML).toBe('min');
    expect(maxLabelElement.innerHTML).toBe('max');
  });

  it('should verify the the disabled class is NOT applied', () => {
    spectator = createHost(`<kirby-range minLabel="min" maxLabel="max"></kirby-range>`);

    const minLabelElement = spectator.query('.min-label');
    const maxLabelElement = spectator.query('.max-label');
    expect(minLabelElement).not.toBeNull();
    expect(maxLabelElement).not.toBeNull();
    console.log(minLabelElement);
    expect(minLabelElement.classList.contains('disabled')).toBe(false);
    expect(maxLabelElement.classList.contains('disabled')).toBe(false);
  });

  it('should verify the the disabled class is applied', () => {
    spectator = createHost(`<kirby-range minLabel="min" maxLabel="max"></kirby-range>`);
    spectator.component.disabled = true;
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
  beforeEach(async () => {
    spectator = createHost(`<kirby-range minLabel="min" maxLabel="max"></kirby-range>`);
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
    spectator = createHost(`<kirby-range></kirby-range>`);
    ionRangeElement = spectator.query('ion-range');
    await TestHelper.whenReady(ionRangeElement);
  });
  it('should have shadow dome', () => {
    expect(ionRangeElement.shadowRoot).not.toBeNull();
  });
  describe('tick should have correct default styling', () => {
    it('ionRange tick should have correct styling', () => {
      const tick = ionRangeElement.shadowRoot.querySelector('[part=tick]');
      expect(tick).toHaveComputedStyle({
        'z-index': '1',
        'border-radius': '50%',
      });
    });
    it('ionRange tick active should have correct styling', () => {
      const tick = ionRangeElement.shadowRoot.querySelector('[part=tick-active]');
      expect(tick).toHaveComputedStyle({
        'z-index': '1',
        'border-radius': '50%',
      });
    });
  });
});
