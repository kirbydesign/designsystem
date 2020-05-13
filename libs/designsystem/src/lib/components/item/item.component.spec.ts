import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { IonicModule } from '@ionic/angular';

import { DesignTokenHelper } from '../../helpers/design-token-helper';

const getTextColor = DesignTokenHelper.getTextColor;
const size = DesignTokenHelper.size;
const fontSize = DesignTokenHelper.fontSize;
const fontWeight = DesignTokenHelper.fontWeight;
const lineHeight = DesignTokenHelper.lineHeight;

import { ItemComponent } from './item.component';
import { TestHelper } from '../../testing/test-helper';

describe('ItemComponent', () => {
  let spectator: SpectatorHost<ItemComponent>;

  const createHost = createHostFactory({
    imports: [IonicModule.forRoot({ mode: 'ios', _testing: true })],
    component: ItemComponent,
    declarations: [],
  });

  it('should create', () => {
    spectator = createHost('<kirby-item></kirby-item>');
    expect(spectator.component).toBeTruthy();
  });

  const styledTextElements = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'data'];
  styledTextElements.forEach((tag) => {
    describe(`when slotting a '${tag}' text element`, () => {
      it('should render with correct style', async () => {
        spectator = createHost(
          `<kirby-item>
             <${tag}>Test</${tag}>
          </kirby-item>`
        );
        const ionItem = spectator.query<HTMLIonItemElement>('ion-item');
        await TestHelper.whenHydrated(ionItem);

        const expectedFontSize = tag === 'p' ? fontSize('s') : fontSize('n');

        const heading = spectator.query(`${tag}:not(.outside)`);
        expect(heading).toHaveComputedStyle({
          'font-size': expectedFontSize,
          'font-weight': fontWeight('normal'),
          'line-height': lineHeight('n'),
          color: getTextColor('black'),
          display: 'block',
          margin: '0px',
          'white-space': 'nowrap',
          overflow: 'hidden',
          'text-overflow': 'ellipsis',
        });
      });
    });
  });

  const styledSubtitleDetailElements = ['h1', 'p', 'data', 'span', 'div'];
  styledSubtitleDetailElements.forEach((tag) => {
    describe(`when slotting a '${tag}' text element with [subtitle] attribute`, () => {
      it('should render with correct style', async () => {
        spectator = createHost(
          `<kirby-item>
             <${tag} subtitle>Test</${tag}>
          </kirby-item>`
        );
        const ionItem = spectator.query<HTMLIonItemElement>('ion-item');
        await TestHelper.whenHydrated(ionItem);

        const heading = spectator.query(`${tag}:not(.outside)`);
        expect(heading).toHaveComputedStyle({
          'font-size': fontSize('xs'),
          'line-height': lineHeight('xs'),
        });
      });

      describe(`and is not last child`, () => {
        it('should render with correct margin', async () => {
          spectator = createHost(
            `<kirby-item>
              <${tag} subtitle>First element</${tag}>
              <p>Second element</p>
            </kirby-item>`
          );
          const ionItem = spectator.query<HTMLIonItemElement>('ion-item');
          await TestHelper.whenHydrated(ionItem);

          const heading = spectator.query(`${tag}:not(.outside)`);
          expect(heading).toHaveComputedStyle({
            'margin-bottom': size('xxxs'),
          });
        });
      });
    });

    describe(`when slotting a '${tag}' text element with [detail] attribute`, () => {
      it('should render with correct style', async () => {
        spectator = createHost(
          `<kirby-item>
             <${tag} detail>Test</${tag}>
          </kirby-item>`
        );
        const ionItem = spectator.query<HTMLIonItemElement>('ion-item');
        await TestHelper.whenHydrated(ionItem);

        const heading = spectator.query(`${tag}:not(.outside)`);
        expect(heading).toHaveComputedStyle({
          'font-size': fontSize('xs'),
          'line-height': lineHeight('xs'),
          color: getTextColor('semi-dark'),
        });
      });
    });
  });
});
