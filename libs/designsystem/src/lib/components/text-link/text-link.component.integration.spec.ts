import { SpectatorHost, createHostFactory } from '@ngneat/spectator';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';

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
    declarations: [IconComponent, SizeDirective],
    imports: [RouterTestingModule, IonicModule.forRoot({ mode: 'ios', _testing: true })],
  });
  describe('test sizes and padding', () => {
    interface TestCase {
      name: string;
      value: string;
      expected_font: string;
      expected_padding_right: string;
      expected_padding_left: string;
    }
    const testCases: TestCase[] = [
      {
        name: 'md',
        value: 'md',
        expected_font: 'm',
        expected_padding_left: 'xxxs',
        expected_padding_right: 's',
      },
      {
        name: 'sm',
        value: 'sm',
        expected_font: 'm',
        expected_padding_left: 'xxxs',
        expected_padding_right: 's',
      },
      {
        name: 'xs',
        value: 'xs',
        expected_font: 's',
        expected_padding_left: 'xxxxs',
        expected_padding_right: 's',
      },
      {
        name: 'Empty',
        value: '',
        expected_font: 'm',
        expected_padding_left: 'xxxs',
        expected_padding_right: 's',
      },
    ];
    testCases.forEach((tc) => {
      it('should render correct size & padding, when size is ' + tc.name, () => {
        spectator = createHost(
          `<kirby-text-link size='${tc.value}' text='Some Link' link='https://angular.io/api/router/RouterLink'></kirby-text-link>`
        );
        const icon = spectator.queryHost<HTMLElement>('kirby-icon');
        expect(icon).toHaveComputedStyle({
          'font-size': size(tc.expected_font),
          'padding-left': size(tc.expected_padding_left),
          'padding-right': size(tc.expected_padding_right),
        });
      });
    });
  });

  describe('Test TextLink sizes and line-height', () => {
    interface TestCase {
      name: string;
      value: string;
      expected: string;
    }
    const testCases: TestCase[] = [
      { name: 'md', value: 'md', expected: 'n' },
      { name: 'sm', value: 'sm', expected: 's' },
      { name: 'xs', value: 'xs', expected: 'xs' },

      { name: 'Empty', value: '', expected: 'n' },
    ];
    testCases.forEach((tc) => {
      it('should render correct size & line-height, when size is ' + tc.name, () => {
        spectator = createHost(`<kirby-text-link size='${tc.value}' text='Some Link' link='/'>`);
        const link = spectator.queryHost<HTMLElement>('a');
        expect(link).toHaveComputedStyle({
          'font-size': fontSize(tc.expected),
          'line-height': lineHeight(tc.expected),
        });
      });
    });
  });
});
