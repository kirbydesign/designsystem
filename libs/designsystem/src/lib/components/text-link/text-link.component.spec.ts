import { RouterTestingModule } from '@angular/router/testing';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';

import { DesignTokenHelper } from '../../helpers';
import { TestHelper } from '../../testing/test-helper';
import { IconComponent } from '../icon';

import { TextLinkComponent } from './text-link.component';

const { fontSize, size, getColor } = DesignTokenHelper;

describe('TextLinkComponent', () => {
  let spectator: SpectatorHost<TextLinkComponent>;

  const createHost = createHostFactory({
    component: TextLinkComponent,
    declarations: [IconComponent],
    imports: [RouterTestingModule, TestHelper.ionicModuleForTest],
  });

  describe(`text link should be`, () => {
    beforeEach(() => {
      spectator = createHost(`<kirby-text-link text='Some Link' route='/'></kirby-text-link>`);
    });

    it('created', () => {
      expect(spectator.component).toBeTruthy();
    });

    it('styled with correct color', () => {
      const anchor = spectator.queryHost<HTMLAnchorElement>('a');

      expect(anchor).toHaveComputedStyle({ color: getColor('black') });
    });

    it('styled with an underline', () => {
      const anchor = spectator.queryHost<HTMLAnchorElement>('a');

      expect(anchor).toHaveComputedStyle({ 'text-decoration-line': 'underline' });
    });

    it('styled with a pointer as the cursor', () => {
      const anchor = spectator.queryHost<HTMLAnchorElement>('a');

      expect(anchor).toHaveComputedStyle({ cursor: 'pointer' });
    });
  });

  describe('with external links', () => {
    beforeEach(() => {
      spectator = createHost(
        `<kirby-text-link  text='Some Link' route='https://angular.io/api/router/RouterLink'></kirby-text-link>`
      );
    });

    it('should have an icon', () => {
      const icon = spectator.queryHost<HTMLElement>('kirby-icon');

      expect(icon).toBeTruthy();
    });

    it('should have icon named [link]', () => {
      const icon = spectator.queryHost<HTMLElement>('kirby-icon');
      const iconName = icon.getAttribute('name');

      expect(iconName).toBe('link');
    });

    it('should render text as the first (left) element in anchor-tag', () => {
      const anchorChildNodes = spectator.queryHost<HTMLAnchorElement>('a').childNodes;

      expect(anchorChildNodes[0].nodeName).toBe('#text');
    });

    it('should render icon as the second (right) element in anchor-tag', () => {
      const anchorChildNodes = spectator.queryHost<HTMLAnchorElement>('a').childNodes;

      expect(anchorChildNodes[1].nodeName).toBe('KIRBY-ICON');
    });

    it('should always center icon vertically', () => {
      const anchor = spectator.queryHost<HTMLAnchorElement>('a');

      expect(anchor).toHaveComputedStyle({ 'align-items': 'center' });
    });

    it('should have left and right margin on icon', () => {
      const icon = spectator.queryHost<HTMLElement>('kirby-icon');

      expect(icon).toHaveComputedStyle({
        'margin-left': size('xxxs'),
        'margin-right': size('xxxs'),
      });
    });
  });

  describe('size and padding', () => {
    const testCases: { size: 'xs' | 'sm' | 'md'; expected: any }[] = [
      { size: 'xs', expected: { iconFontSize: size('s'), fontSize: fontSize('xs') } },
      { size: 'sm', expected: { iconFontSize: size('s'), fontSize: fontSize('s') } },
      { size: 'md', expected: { iconFontSize: size('m'), fontSize: fontSize('n') } },
    ];

    testCases.forEach((scenario) => {
      describe(`when size is ${scenario.size || 'empty'}`, () => {
        describe(`external link`, () => {
          beforeEach(() => {
            spectator = createHost(
              `<kirby-text-link size='${scenario.size}' text='External link' route='https://angular.io/api/router/RouterLink'></kirby-text-link>`
            );
          });

          it('should render icon with correct font size', () => {
            const icon = spectator.queryHost<HTMLElement>('kirby-icon');

            expect(icon).toHaveComputedStyle({
              'font-size': scenario.expected.iconFontSize,
            });
          });

          it('should render anchor with correct font size', () => {
            const anchor = spectator.queryHost<HTMLElement>('a');

            expect(anchor).toHaveComputedStyle({
              'font-size': scenario.expected.fontSize,
            });
          });
        });

        describe(`internal link`, () => {
          beforeEach(() => {
            spectator = createHost(
              `<kirby-text-link size='${scenario.size}' text='Internal link' route='/'></kirby-text-link>`
            );
          });

          it('should render anchor with correct font size', () => {
            const anchor = spectator.queryHost<HTMLElement>('a');

            expect(anchor).toHaveComputedStyle({
              'font-size': scenario.expected.fontSize,
            });
          });
        });
      });
    });
  });
});
