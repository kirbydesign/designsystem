import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonRange } from '@ionic/angular';
import {
  createComponentFactory,
  createHostFactory,
  Spectator,
  SpectatorHost,
} from '@ngneat/spectator';

import { DesignTokenHelper } from '../../helpers';

import { RangeComponent } from './range.component';

const size = DesignTokenHelper.size;

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('simple properties', () => {
  let spectator: Spectator<RangeComponent>;
  const createHost = createComponentFactory({
    component: RangeComponent,
    declarations: [RangeComponent, IonRange],
  });

  beforeEach(() => {
    spectator = createHost({
      props: { value: 30, min: 30, max: 42 },
    });
  });
  /*
      it(`tick should have z-index`, () => {
        expect(spectator.element).toHaveComputedStyle({
          'z-index': '1',
        });
      });
      */

  it('should not be disabled', () => {
    expect(spectator.component.disabled).toBe(false);
  });
  it('should set disabled state', () => {
    spectator.component.setDisabledState(true);
    expect(spectator.component.disabled).toBe(true);
  });
  it('should set value', () => {
    expect(spectator.component.value).toBe(30);
    spectator.component.value = 42;
    expect(spectator.component.value).toBe(42);
  });

  it('should set value and react to change event', () => {
    expect(spectator.component.value).toBe(30);
    const expectedValue = 42;
    let value = 0;
    spectator.component.valueChange.subscribe((v) => (value = v));
    spectator.component.value = expectedValue;
    expect(value).toBe(expectedValue);
  });
});

describe('integration test of component', () => {
  let spectator: SpectatorHost<RangeComponent>;
  let ionRangeElement: HTMLIonRangeElement;

  const createHost = createHostFactory({
    component: RangeComponent,
    declarations: [RangeComponent, IonRange],
  });
  describe('Component Factory', () => {
    beforeEach(() => {
      spectator = createHost(`<kirby-range></kirby-range>`);
      ionRangeElement = spectator.query('ion-range');
    });
    it('should create spectator host', () => {
      expect(spectator).not.toBeNull();
      expect(spectator.component).toBeTruthy();
      expect(ionRangeElement).not.toBeNull();
    });
  });
  describe('component with correct styling', () => {
    beforeEach(() => {
      spectator = createHost(`<kirby-range></kirby-range>`);
    });

    it('should have correct padding', () => {
      expect(spectator.element).toHaveComputedStyle({ 'padding-left': size('s') });
      expect(spectator.element).toHaveComputedStyle({ 'padding-right': size('s') });
      expect(spectator.element).toHaveComputedStyle({ 'padding-top': size('xxs') });
      expect(spectator.element).toHaveComputedStyle({ 'padding-bottom': size('xxs') });
    });
  });
  describe('should verify ', () => {
    let minLabelElement: HTMLElement;
    let labelTextElement: HTMLElement;
    let ionRangeElement: HTMLIonRangeElement;
    beforeEach(() => {
      spectator = createHost(
        `<kirby-range ticks="5" step="1" snaps="true" pin="true" minLabel="Min" maxLabel="Max" max="5" min="1"></kirby-range>`
      );
      ionRangeElement = spectator.query('ion-range');
    });

    it('component with correct property values', () => {
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

    it('should render the label with correct typography', () => {
      minLabelElement = spectator.queryHost('label');
      expect(minLabelElement).not.toBeNull();

      /*
      const messageWrapperElement = spectator.queryHost('.texts');
      expect(messageWrapperElement).toHaveComputedStyle({
        'padding-top': '2px',
        'padding-left': size('s'),
        'padding-right': size('s'),
        'padding-bottom': '0px',
      });

      labelTextElement = spectator.queryHost('startLabel .text');
*/
    });
  });
});
