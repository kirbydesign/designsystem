import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';

import { IconModule } from '@kirbydesign/designsystem/icon';
import { IonItem } from '@ionic/angular/standalone';

import { TestHelper } from '@kirbydesign/designsystem/testing';
import { ItemComponent, ItemSize } from './item.component';

const { itemHeight, size } = DesignTokenHelper;

const rotationMatrix = 'matrix(-1, 0, 0, -1, 0, 0)';

describe('ItemComponent', () => {
  let spectator: SpectatorHost<ItemComponent>;

  const createHost = createHostFactory({
    imports: [TestHelper.ionicModuleForTest, IconModule, IonItem],
    component: ItemComponent,
  });

  describe('kirby-item with input', () => {
    beforeEach(() => {
      spectator = createHost(
        '<kirby-item [disclosure]="disclosure" [selectable]="selectable" [href]="href" [rotateIcon]="rotateIcon">Value</kirby-item>'
      );
    });

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });

    it('should have size md as default', () => {
      expect(spectator.query('ion-item')).toHaveComputedStyle({
        '--min-height': itemHeight('m'),
      });
    });

    it('should not render a native button by default', async () => {
      const ionItem = spectator.queryHost('ion-item');
      await TestHelper.whenReady(ionItem);

      const nativePart = ionItem.shadowRoot.querySelector('[part="native"]');
      expect(nativePart.tagName).not.toEqual('BUTTON');
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
        expect(spectator.query('ion-item')).toHaveComputedStyle({
          '--padding-bottom': size('xxs'),
        });
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
        spectator.setHostInput('disclosure', 'arrow-down');
        spectator.detectChanges();

        const disclosureWrapper = spectator.query<HTMLElement>('.disclosure');
        const icon = spectator.query<HTMLElement>('kirby-icon');

        expect(disclosureWrapper).toHaveComputedStyle({
          height: getComputedStyle(icon).height,
        });
      });

      describe('when rotateIcon is set to true', () => {
        beforeEach(() => {
          spectator.setHostInput('rotateIcon', true);
        });

        it('should rotate the icon 180deg if the disclosure icon is "arrow-down"', async () => {
          spectator.setHostInput('disclosure', 'arrow-down');
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
          spectator.setHostInput('disclosure', 'arrow-up');
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
          spectator.setHostInput('disclosure', 'arrow-more');
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
          spectator.setHostInput('disclosure', 'link');
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

    describe('when configured with selectable', () => {
      it('should not render a native button when selectable="false"', async () => {
        spectator.setHostInput('selectable', false);
        const ionItem = spectator.queryHost('ion-item');
        await TestHelper.whenReady(ionItem);

        const nativePart = ionItem.shadowRoot.querySelector('[part="native"]');
        expect(nativePart.tagName).not.toEqual('BUTTON');
      });

      it('should render a native button when selectable="true"', async () => {
        spectator.setHostInput('selectable', true);
        const ionItem = spectator.queryHost('ion-item');
        await TestHelper.whenReady(ionItem);

        const nativePart = ionItem.shadowRoot.querySelector('[part="native"]');
        expect(nativePart.tagName).toEqual('BUTTON');
      });
    });
  });

  describe('when configured with link', () => {
    beforeEach(() => {
      spectator = createHost(
        '<kirby-item href="www.kirby.com" target="_blank" rel="noopener noreferrer" download>Value</kirby-item>'
      );
    });
    it('should render a native link when href is set', async () => {
      const ionItem = spectator.queryHost('ion-item');
      await TestHelper.whenReady(ionItem);

      const nativePart = ionItem.shadowRoot.querySelector('[part="native"]');
      expect(nativePart.tagName).toEqual('A');
      expect(nativePart.getAttribute('href')).toEqual('www.kirby.com');
    });

    it('should forward link attributes to the internal ion-item', async () => {
      const ionItem = spectator.queryHost('ion-item');
      await TestHelper.whenReady(ionItem);

      const nativePart = ionItem.shadowRoot.querySelector('[part="native"]');
      expect(nativePart.tagName).toEqual('A');
      expect(nativePart.getAttribute('target')).toEqual('_blank');
      expect(nativePart.getAttribute('rel')).toEqual('noopener noreferrer');
      expect(nativePart.getAttribute('download')).toEqual('');
    });
  });
});
