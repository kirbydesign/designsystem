import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { TestHelper } from '@kirbydesign/designsystem/testing';
import { RangeComponent } from './range.component';

describe('RangeComponent', () => {
  let spectator: SpectatorHost<RangeComponent>;

  const createHost = createHostFactory({
    component: RangeComponent,
    imports: [TestHelper.ionicModuleForTest],
  });

  beforeEach(() => {
    spectator = createHost('<kirby-range aria-label="aria-test" ></kirby-range>');
  });

  it('should set aria-label attribute on ion-range', () => {
    const ionRangeElement = spectator.query('ion-range');
    expect(ionRangeElement.getAttribute('aria-label')).toEqual('aria-test');
    expect(spectator.element.getAttribute('aria-label')).toBeNull();
  });
  it('should set aria-label attribute on ion-range with pin', () => {
    spectator.setHostInput('pin', true);
    const ionRangeElement = spectator.query('ion-range');
    expect(ionRangeElement.getAttribute('aria-label')).toEqual('aria-test');
    expect(spectator.element.getAttribute('aria-label')).toBeNull();
  });
  it('should set aria-label attribute on ion-range with pin and pinFormatter', () => {
    spectator.setHostInput('pin', true);
    spectator.setHostInput('pinFormatter', (value: number) => `${value}%`);
    const ionRangeElement = spectator.query('ion-range');
    expect(ionRangeElement.getAttribute('aria-label')).toEqual('aria-test');
    expect(spectator.element.getAttribute('aria-label')).toBeNull();
  });
  it('should set aria-label attribute on ion-range with pin and pinFormatter and ticks', () => {
    spectator.setHostInput('pin', true);
    spectator.setHostInput('pinFormatter', (value: number) => `${value}%`);
    spectator.setHostInput('ticks', true);
    const ionRangeElement = spectator.query('ion-range');
    expect(ionRangeElement.getAttribute('aria-label')).toEqual('aria-test');
    expect(spectator.element.getAttribute('aria-label')).toBeNull();
  });
  it('should set aria-label attribute on ion-range with pin and pinFormatter and ticks and minLabel', () => {
    spectator.setHostInput('pin', true);
    spectator.setHostInput('pinFormatter', (value: number) => `${value}%`);
    spectator.setHostInput('ticks', true);
    spectator.setHostInput('minLabel', 'Min label');
    const ionRangeElement = spectator.query('ion-range');
    expect(ionRangeElement.getAttribute('aria-label')).toEqual('aria-test');
    expect(spectator.element.getAttribute('aria-label')).toBeNull();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should always have a pinFormatter function when pin is set', () => {
    spectator.setHostInput('pin', true);
    expect(spectator.component.pinFormatter).toBeDefined();
  });
});
