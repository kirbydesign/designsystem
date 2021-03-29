import { RouterTestingModule } from '@angular/router/testing';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';

import { DesignTokenHelper } from '../../helpers';
import { IconComponent } from '../icon';

import { TextLinkComponent } from './text-link.component';

const fontSize = DesignTokenHelper.fontSize;
const lineHeight = DesignTokenHelper.lineHeight;
const size = DesignTokenHelper.size;

const getColor = DesignTokenHelper.getColor;

describe('TextLinkComponent', () => {
  let spectator: SpectatorHost<TextLinkComponent>;

  const createHost = createHostFactory({
    component: TextLinkComponent,
    declarations: [MockComponent(IconComponent)],
    imports: [RouterTestingModule],
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
      const textlink = spectator.queryHost<HTMLElement>('kirby-text-link');

      expect(textlink).toHaveComputedStyle({ cursor: 'pointer' });
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
      const icon = spectator.queryHost<HTMLElement>('kirby-icon');
      expect(icon).toHaveComputedStyle({ 'vertical-align': 'middle' });
    });
  });

  describe('size and padding', () => {
    interface TestCase {
      size?: string;
      expected: {
        fontSize: string;
        lineHeight: string;
        iconMarginLeft: string;
        iconFontSize: string;
      };
    }

    const testCases: TestCase[] = [
      {
        size: 'md',
        expected: {
          fontSize: 'n',
          lineHeight: 'n',
          iconMarginLeft: 'xxxs',
          iconFontSize: 'm',
        },
      },
      {
        size: 'sm',
        expected: {
          fontSize: 's',
          lineHeight: 's',
          iconMarginLeft: 'xxxs',
          iconFontSize: 'm',
        },
      },
      {
        size: 'xs',
        expected: {
          fontSize: 'xs',
          lineHeight: 'xs',
          iconMarginLeft: 'xxxxs',
          iconFontSize: 's',
        },
      },
      {
        size: '',
        expected: {
          fontSize: 'n',
          lineHeight: 'n',
          iconMarginLeft: 'xxxs',
          iconFontSize: 'm',
        },
      },
    ];

    testCases.forEach((scenario) => {
      describe(`when size is ${scenario.size || 'empty'}`, () => {
        describe(`external link`, () => {
          beforeEach(() => {
            spectator = createHost(
              `<kirby-text-link size='${scenario.size}' text='External link' route='https://angular.io/api/router/RouterLink'></kirby-text-link>`
            );
            console.log(spectator);
          });

          it('should render icon with correct styling', () => {
            const icon = spectator.queryHost<HTMLElement>('kirby-icon');

            expect(icon).toHaveComputedStyle({
              'font-size': size(scenario.expected.iconFontSize),
              'margin-left': size(scenario.expected.iconMarginLeft),
            });
          });

          it('should render anchor link with corrrect styling', () => {
            const link = spectator.queryHost<HTMLElement>('a');

            expect(link).toHaveComputedStyle({
              'font-size': fontSize(scenario.expected.fontSize),
              'line-height': lineHeight(scenario.expected.lineHeight),
            });
          });
        });

        describe(`internal link`, () => {
          beforeEach(() => {
            spectator = createHost(
              `<kirby-text-link size='${scenario.size}' text='Internal link' route='/'></kirby-text-link>`
            );
          });

          it('should render anchor link with corrrect styling', () => {
            const link = spectator.queryHost<HTMLElement>('a');

            expect(link).toHaveComputedStyle({
              'font-size': fontSize(scenario.expected.fontSize),
              'line-height': lineHeight(scenario.expected.lineHeight),
            });
          });
        });
      });
    });
  });
});
