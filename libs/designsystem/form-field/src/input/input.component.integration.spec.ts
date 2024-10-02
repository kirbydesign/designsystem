import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';

import { TestHelper } from '@kirbydesign/designsystem/testing';

import { ItemComponent } from '@kirbydesign/designsystem/item';
import { InputComponent } from './input.component';

const size = DesignTokenHelper.size;

describe('InputComponent in Item', () => {
  let spectator: SpectatorHost<InputComponent>;
  let element: HTMLInputElement;

  const createHost = createHostFactory({
    component: InputComponent,
    declarations: [ItemComponent],
    imports: [TestHelper.ionicModuleForTest],
  });

  describe('by default', () => {
    beforeEach(() => {
      spectator = createHost(`
      <kirby-item>
        <input kirby-input/>
      </kirby-item>`);
      element = spectator.element as HTMLInputElement;
    });

    it('should render with correct padding', () => {
      expect(element).toHaveComputedStyle({
        'padding-inline': '0px',
      });
    });

    it('should render without border-radius', () => {
      expect(element).toHaveComputedStyle({
        'border-radius': '0px',
      });
    });

    it('should render without box-shadow', () => {
      expect(element).toHaveComputedStyle({
        'border-shadow': '',
      });
    });

    it('should render with correct width', () => {
      //window.getComputedStyle() returns width in pixels - so use element.computedStyleMap:
      const styleWidth = (element as any).computedStyleMap().get('width').toString();
      expect(styleWidth).toBe('100%');
    });
  });

  describe('slotted end', () => {
    beforeEach(() => {
      spectator = createHost(`
      <kirby-item>
        <input slot="end" kirby-input/>
      </kirby-item>`);
      element = spectator.element as HTMLInputElement;
    });

    it('should render with default width', () => {
      //window.getComputedStyle() returns width in pixels - so use element.computedStyleMap:
      const styleWidth = (element as any).computedStyleMap().get('width').toString();
      expect(styleWidth).toBe('auto');
    });

    it('should render with correct margin', () => {
      expect(element).toHaveComputedStyle({
        'margin-inline-start': size('s'),
      });
    });

    it('should render with text alignment end', () => {
      expect(element).toHaveComputedStyle({
        'text-align': 'end',
      });
    });
  });
});
