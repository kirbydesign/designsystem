import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MockModule } from 'ng-mocks';

import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';

import { IconModule } from '@kirbydesign/designsystem/icon';

import { TestHelper } from '@kirbydesign/designsystem/testing';
import { ItemComponent, ItemSize } from './item.component';

const { itemHeight, size } = DesignTokenHelper;

const rotationMatrix = 'matrix(-1, 0, 0, -1, 0, 0)';

describe('ItemComponent', () => {
  let spectator: SpectatorHost<ItemComponent>;

  const createHost = createHostFactory({
    imports: [MockModule(IonicModule), IconModule],
    component: ItemComponent,
  });

  beforeEach(() => {
    spectator = createHost('<kirby-item>Value</kirby-item>');
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should have size md as default', () => {
    expect(spectator.query('ion-item')).toHaveComputedStyle({
      '--min-height': itemHeight('m'),
    });
  });

  describe('when configured with size', () => {
    describe('and size = xs', () => {
      it('should have correct item height and padding', () => {
        spectator.component.size = ItemSize.XS;
        spectator.detectChanges();

        expect(spectator.query('ion-item')).toHaveComputedStyle({
          '--min-height': itemHeight('xs'),
          '--inner-padding-top': size('xxxs'),
          '--inner-padding-bottom': size('xxxs'),
        });
      });
    });

    describe('and size = sm', () => {
      it('should have correct item height', () => {
        spectator.component.size = ItemSize.SM;
        spectator.detectChanges();

        expect(spectator.query('ion-item')).toHaveComputedStyle({
          '--min-height': itemHeight('s'),
        });
      });
    });

    describe('and size = md', () => {
      it('should have correct item height', () => {
        spectator.component.size = ItemSize.MD;
        spectator.detectChanges();

        expect(spectator.query('ion-item')).toHaveComputedStyle({
          '--min-height': itemHeight('m'),
        });
      });
    });
  });

  describe('when --item-padding-top css custom property is set', () => {
    it('should set correct --padding-top css custom property', () => {
      spectator.element.style.setProperty('--item-padding-top', '8px');
      expect(spectator.query('ion-item')).toHaveComputedStyle({ '--padding-top': size('xxs') });
    });
  });

  describe('when --item-padding-bottom css custom property is set', () => {
    it('should set correct --padding-bottom css custom property', () => {
      spectator.element.style.setProperty('--item-padding-bottom', '8px');
      expect(spectator.query('ion-item')).toHaveComputedStyle({ '--padding-bottom': size('xxs') });
    });
  });

  describe('when disclosure is set to something valid', () => {
    it('should set inner-padding-end to xxs', () => {
      spectator.component.disclosure = 'arrow-more';
      spectator.detectChanges();

      expect(spectator.query('ion-item')).toHaveComputedStyle({
        '--inner-padding-end': size('xxs'),
      });
    });

    it('should make the disclosure wrapper element get the same height as its child (kirby-icon)', async () => {
      spectator.setInput('disclosure', 'arrow-down');
      spectator.detectChanges();

      const disclosureWrapper = spectator.query<HTMLElement>('.disclosure');
      const icon = spectator.query<HTMLElement>('kirby-icon');

      expect(disclosureWrapper).toHaveComputedStyle({
        height: getComputedStyle(icon).height,
      });
    });

    describe('when rotateIcon is set to true', () => {
      beforeEach(() => {
        spectator.setInput('rotateIcon', true);
      });

      it('should rotate the icon 180deg if the disclosure icon is "arrow-down"', async () => {
        spectator.setInput('disclosure', 'arrow-down');
        spectator.detectChanges();

        const icon = spectator.query<HTMLElement>('kirby-icon');

        // By awaiting the ion-icon component to be ready, we ensure that the parent (kirby-icon) has been rendered.
        // Otherwise, the computed style will sporadically be evaluated as "transform: none".
        const ionIcon = spectator.query<HTMLElement>('ion-icon');
        await TestHelper.ionComponentOnReady(ionIcon);

        expect(icon).toHaveComputedStyle({
          transform: rotationMatrix,
        });
      });

      it('should rotate the icon 180deg if the disclosure icon is "arrow-up"', async () => {
        spectator.setInput('disclosure', 'arrow-up');
        spectator.detectChanges();

        const icon = spectator.query<HTMLElement>('kirby-icon');

        // By awaiting the ion-icon component to be ready, we ensure that the parent (kirby-icon) has been rendered.
        // Otherwise, the computed style will sporadically be evaluated as "transform: none".
        const ionIcon = spectator.query<HTMLElement>('ion-icon');
        await TestHelper.ionComponentOnReady(ionIcon);

        expect(icon).toHaveComputedStyle({
          transform: rotationMatrix,
        });
      });

      it('should NOT rotate the icon 180deg if the disclosure icon is "arrow-more"', async () => {
        spectator.setInput('disclosure', 'arrow-more');
        spectator.detectChanges();

        const icon = spectator.query('kirby-icon');

        // By awaiting the ion-icon component to be ready, we ensure that the parent (kirby-icon) has been rendered.
        // Otherwise, the computed style will sporadically be evaluated as "transform: none".
        const ionIcon = spectator.query<HTMLElement>('ion-icon');
        await TestHelper.ionComponentOnReady(ionIcon);

        expect(icon).toHaveComputedStyle({
          transform: 'none',
        });
      });

      it('should NOT rotate the icon 180deg if the disclosure icon is "link"', async () => {
        spectator.setInput('disclosure', 'link');
        spectator.detectChanges();

        const icon = spectator.query('kirby-icon');

        // By awaiting the ion-icon component to be ready, we ensure that the parent (kirby-icon) has been rendered.
        // Otherwise, the computed style will sporadically be evaluated as "transform: none".
        const ionIcon = spectator.query<HTMLElement>('ion-icon');
        await TestHelper.ionComponentOnReady(ionIcon);

        expect(icon).toHaveComputedStyle({
          transform: 'none',
        });
      });
    });
  });

  describe('when disclosure is reset to null', () => {
    it('should reset inner-padding-end to s', () => {
      spectator.component.disclosure = 'arrow-more';
      spectator.detectChanges();

      expect(spectator.query('ion-item')).toHaveComputedStyle({
        '--inner-padding-end': size('xxs'),
      });

      spectator.component.disclosure = null;
      spectator.detectChanges();

      expect(spectator.query('ion-item')).toHaveComputedStyle({
        '--inner-padding-end': size('s'),
      });
    });
  });

  describe('disabled', () => {
    it('should not have computed style "pointer:none" by default', () => {
      expect(spectator.element).not.toHaveComputedStyle({ 'pointer-events': 'none' });
    });

    it(`should have computed style 'pointer:none' when having '[disabled]="true"'`, () => {
      spectator.component.disabled = true;
      spectator.detectChanges();

      expect(spectator.element).toHaveComputedStyle({ 'pointer-events': 'none' });
    });

    it(`should not have computed style "pointer:none" when having '[disabled]="false"`, () => {
      spectator.component.disabled = false;
      spectator.detectChanges();

      expect(spectator.element).not.toHaveComputedStyle({ 'pointer-events': 'none' });
    });

    it('should not have computed style "pointer:none" when not having "[disabled]" input defined', () => {
      spectator.component.disabled = undefined;
      spectator.detectChanges();

      expect(spectator.element).not.toHaveComputedStyle({ 'pointer-events': 'none' });
    });

    it('should have computed style "pointer:none" when having disabled attribute', () => {
      spectator.element.setAttribute('disabled', '');
      spectator.detectChanges();

      expect(spectator.element).toHaveComputedStyle({ 'pointer-events': 'none' });
    });
  });
});
