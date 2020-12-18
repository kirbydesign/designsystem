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

describe('TextLinkComponent integrationt test', () => {
  let spectator: SpectatorHost<TextLinkComponent>;

  const createHost = createHostFactory({
    component: TextLinkComponent,
    declarations: [MockComponent(IconComponent), SizeDirective],
    imports: [RouterTestingModule],
  });
  describe('size and padding', () => {
    interface TestCase {
      name: string;
      value: string;
      expected_font: string;
      expected_padding_right: string;
      expected_padding_left: string;
      expected_line_height: string;
    }
    const testCases: TestCase[] = [
      {
        name: 'md',
        value: 'md',
        expected_font: 'm',
        expected_padding_left: 'xxxs',
        expected_padding_right: 's',
        expected_line_height: 'n',
      },
      {
        name: 'sm',
        value: 'sm',
        expected_font: 'm',
        expected_padding_left: 'xxxs',
        expected_padding_right: 's',
        expected_line_height: 's',
      },
      {
        name: 'xs',
        value: 'xs',
        expected_font: 's',
        expected_padding_left: 'xxxxs',
        expected_padding_right: 's',
        expected_line_height: 'xs',
      },
      {
        name: 'Empty',
        value: '',
        expected_font: 'm',
        expected_padding_left: 'xxxs',
        expected_padding_right: 's',
        expected_line_height: 'n',
      },
    ];
    testCases.forEach((tc) => {
      it('should render correct size & padding, when size is ' + tc.name, () => {
        spectator = createHost(
          `<kirby-text-link size='${tc.value}' text='Some Link' link='https://angular.io/api/router/RouterLink'></kirby-text-link>`
        );
        const icon = spectator.queryHost<HTMLElement>('kirby-icon');
        expect(icon).toHaveComputedStyle({
          'font-size': fontSize(tc.expected_font),
          'padding-left': size(tc.expected_padding_left),
          'padding-right': size(tc.expected_padding_right),
          'line-height': lineHeight(tc.expected_line_height),
        });
      });
      it('should render correct size & lineHeight, when size is ' + tc.name, () => {
        spectator = createHost(
          `<kirby-text-link size='${tc.value}' text='Some Link' link='https://angular.io/api/router/RouterLink'></kirby-text-link>`
        );
        const icon = spectator.queryHost<HTMLElement>('kirby-icon');
        expect(icon).toHaveComputedStyle({
          'font-size': fontSize(tc.expected_font),
          'line-height': lineHeight(tc.expected_line_height),
        });
      });
    });
  });
});
/*  expect(ionIcon).toHaveComputedStyle({ width: size('m'), height: size('m')

 const avatar = spectator.queryHost<HTMLElement>('.avatar');
      expect(avatar).toHaveComputedStyle({ width: avatarSize('m'), height: avatarSize('m') }); */
