import { SpectatorHost, createHostFactory } from '@ngneat/spectator';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';

import { TextLinkComponent } from './text-link.component';
import { DesignTokenHelper } from '../../helpers';
import { SizeDirective } from '../../directives';
import { IconComponent } from '../icon';

const fontSize = DesignTokenHelper.fontSize;
const lineHeight = DesignTokenHelper.lineHeight;
const size = DesignTokenHelper.size;

const getColor = DesignTokenHelper.getColor;

describe('TextLinkComponent', () => {
  let spectator: SpectatorHost<TextLinkComponent>;

  const createHost = createHostFactory({
    component: TextLinkComponent,
    declarations: [MockComponent(IconComponent), SizeDirective],
    imports: [RouterTestingModule],
  });
  describe(`text link should be `, () => {
    beforeEach(() => {
      spectator = createHost(`<kirby-text-link text='Some Link' link='/'></kirby-text-link>`);
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
        `<kirby-text-link  text='Some Link' link='https://angular.io/api/router/RouterLink'></kirby-text-link>`
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

    it('should render the icon to the right from the text', () => {
      const icon = spectator.queryHost<HTMLElement>('kirby-icon');
      const text = spectator.queryHost<HTMLElement>('a');
      const textPosition = text.getBoundingClientRect();
      const iconPosition = icon.getBoundingClientRect();
      expect(textPosition.right).toBeLessThan(iconPosition.right);
    });
  });
  describe('size and padding', () => {
    interface TestCase {
      size?: string;
      expected: {
        fontSize: string;
        fontLineHeight: string;
        iconPaddingLeft: string;
        iconPaddingRight: string;
        iconFontSize: string;
        iconVerticalAlign: string;
      };
    }

    const testCases: TestCase[] = [
      {
        size: 'md',
        expected: {
          fontSize: 'n',
          fontLineHeight: 'n',
          iconPaddingLeft: 'xxxs',
          iconPaddingRight: 's',
          iconFontSize: 'm',
          iconVerticalAlign: 'middle',
        },
      },
      {
        size: 'sm',
        expected: {
          fontSize: 's',
          fontLineHeight: 's',
          iconPaddingLeft: 'xxxs',
          iconPaddingRight: 's',
          iconFontSize: 'm',
          iconVerticalAlign: 'middle',
        },
      },
      {
        size: 'xs',
        expected: {
          fontSize: 'xs',
          fontLineHeight: 'xs',
          iconPaddingLeft: 'xxxxs',
          iconPaddingRight: 's',
          iconFontSize: 's',
          iconVerticalAlign: 'middle',
        },
      },
      {
        size: '',
        expected: {
          fontSize: 'n',
          fontLineHeight: 'n',
          iconPaddingLeft: 'xxxs',
          iconPaddingRight: 's',
          iconFontSize: 'm',
          iconVerticalAlign: 'middle',
        },
      },
    ];
    testCases.forEach((scenario) => {
      describe(`when size is ${scenario.size || 'empty'}`, () => {
        describe(`external link`, () => {
          beforeEach(() => {
            spectator = createHost(
              `<kirby-text-link size='${scenario.size}' text='External link' link='https://angular.io/api/router/RouterLink'></kirby-text-link>`
            );
          });
          it('should render icon with correct styling', () => {
            const icon = spectator.queryHost<HTMLElement>('kirby-icon');

            expect(icon).toHaveComputedStyle({
              'font-size': size(scenario.expected.iconFontSize),
              'padding-left': size(scenario.expected.iconPaddingLeft),
              'padding-right': size(scenario.expected.iconPaddingRight),
              'vertical-align': scenario.expected.iconVerticalAlign,
            });
          });
          it('should render anchor link with corrrect styling', () => {
            const link = spectator.queryHost<HTMLElement>('a');
            expect(link).toHaveComputedStyle({
              'font-size': fontSize(scenario.expected.fontSize),
              'line-height': lineHeight(scenario.expected.fontLineHeight),
            });
          });
        });

        describe(`internal link`, () => {
          beforeEach(() => {
            spectator = createHost(
              `<kirby-text-link size='${scenario.size}' text='Internal link' link='/'></kirby-text-link>`
            );
          });
          it('should render anchor link with corrrect styling', () => {
            const link = spectator.queryHost<HTMLElement>('a');
            expect(link).toHaveComputedStyle({
              'font-size': fontSize(scenario.expected.fontSize),
              'line-height': lineHeight(scenario.expected.fontLineHeight),
            });
          });
        });
      });
    });
  });
});
