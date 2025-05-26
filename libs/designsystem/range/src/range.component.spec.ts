import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { TestHelper } from '@kirbydesign/designsystem/testing';
import { RangeComponent } from './range.component';

describe('RangeComponent', () => {
  let spectator: SpectatorHost<RangeComponent>;

  const createHost = createHostFactory({
    component: RangeComponent,
    imports: [TestHelper.ionicModuleForTest],
  });

  describe('default', () => {
    beforeEach(() => {
      spectator = createHost('<kirby-range></kirby-range>');
    });

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });

    it('should always have a pinFormatter function when pin is set', () => {
      spectator.setHostInput('pin', true);
      expect(spectator.component.pinFormatter).toBeDefined();
    });
  });
  describe('with attributes', () => {
    it('should set aria-label attribute on ion-range', () => {
      spectator = createHost('<kirby-range aria-label="aria-test" ></kirby-range>');
      const ionRangeElement = spectator.query('ion-range');
      expect(ionRangeElement.getAttribute('aria-label')).toEqual('aria-test');
      expect(spectator.element.getAttribute('aria-label')).toBeNull();
    });

    it('should set aria-labelledby attribute on ion-range', () => {
      spectator = createHost('<kirby-range aria-labelledby="aria-test" ></kirby-range>');
      const ionRangeElement = spectator.query('ion-range');
      expect(ionRangeElement.getAttribute('aria-labelledby')).toEqual('aria-test');
      expect(spectator.element.getAttribute('aria-labelledby')).toBeNull();
    });
  });
});
