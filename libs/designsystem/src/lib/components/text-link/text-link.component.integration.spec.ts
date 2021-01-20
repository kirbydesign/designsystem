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

describe('TextLinkComponent', () => {
  let spectator: SpectatorHost<TextLinkComponent>;

  const createHost = createHostFactory({
    component: TextLinkComponent,
    declarations: [MockComponent(IconComponent), SizeDirective],
    imports: [RouterTestingModule],
  });
  describe('size and padding', () => {
    interface TestCase {
      size?: string;
      expected: {
        fontSize: string;
        fontLineHeight: string;
        iconPaddingLeft: string;
        iconPaddingRight: string;
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
        },
      },
      {
        size: 'sm',
        expected: {
          fontSize: 's',
          fontLineHeight: 's',
          iconPaddingLeft: 'xxxs',
          iconPaddingRight: 's',
        },
      },
      {
        size: 'xs',
        expected: {
          fontSize: 'xs',
          fontLineHeight: 'xs',
          iconPaddingLeft: 'xxxxs',
          iconPaddingRight: 's',
        },
      },
      {
        size: '',
        expected: {
          fontSize: 'n',
          fontLineHeight: 'n',
          iconPaddingLeft: 'xxxs',
          iconPaddingRight: 's',
        },
      },
    ];
    testCases.forEach((scenario) => {
      describe(`when size is ${scenario.size}`, () => {
        describe(`external link`, () => {
          beforeEach(() => {
            spectator = createHost(
              `<kirby-text-link size='${scenario.size}' text='Some Link' link='https://angular.io/api/router/RouterLink'></kirby-text-link>`
            );
          });
          it('should render icon with correct styling', () => {
            const icon = spectator.queryHost<HTMLElement>('kirby-icon');

            expect(icon).toHaveComputedStyle({
              // 'font-size': fontSize(tc.expected_font),
              'padding-left': size(scenario.expected.iconPaddingLeft),
              'padding-right': size(scenario.expected.iconPaddingRight),
              // 'line-height': lineHeight(tc.expected_line_height),
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
          it('should render anchor link with corrrect styling', () => {
            spectator = createHost(
              `<kirby-text-link size='${scenario.size}' text='Some Link' link='/'>`
            );
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
