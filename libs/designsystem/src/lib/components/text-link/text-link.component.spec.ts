import { SpectatorHost, createHostFactory } from '@ngneat/spectator';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';

import { TextLinkComponent } from './text-link.component';
import { DesignTokenHelper } from '../../helpers';
import { SizeDirective } from '../../directives';
import { IconComponent } from '../icon';

const getColor = DesignTokenHelper.getColor;
const fontSize = DesignTokenHelper.fontSize;
const lineHeight = DesignTokenHelper.lineHeight;
const size = DesignTokenHelper.size;

/*
TEST TO INCLUDE
1.  Test for size - xs,sm,md for both -> icon √ and text √
2.  Test for Icon apperance on external links √
3.  Test logic for determining external links?
4.  Test for right color (1c1c1c) √
5.  Test for text containg  underline √
6.  Test for using the correct icon √
7.  Test that the cursor changes when mouse over link? √
8.  Test that Icon is position to the right from text √
9.  Test that text-link component is created  √

*/
describe('TextLinkComponent', () => {
  let spectator: SpectatorHost<TextLinkComponent>;

  const createHost = createHostFactory({
    component: TextLinkComponent,
    declarations: [IconComponent, SizeDirective],
    imports: [RouterTestingModule, IonicModule.forRoot({ mode: 'ios', _testing: true })],
  });

  it('should create', () => {
    spectator = createHost(`<kirby-text-link text='Some Link' link='/'>`);
    expect(spectator.component).toBeTruthy();
  });

  it('should render with correct color', () => {
    spectator = createHost(`<kirby-text-link text='Some Link' link='/'>`);
    const link = spectator.queryHost<HTMLElement>('a');
    expect(link).toHaveComputedStyle({ color: getColor('black') });
  });

  it('should render with an underline', () => {
    spectator = createHost(`<kirby-text-link text='Some Link' link='/'>`);
    const link = spectator.queryHost<HTMLElement>('a');
    expect(link).toHaveComputedStyle({ 'text-decoration-line': 'underline' });
  });

  it('should have a pointer as the cursor', () => {
    spectator = createHost(`<kirby-text-link text='Some Link' link='/'>`);

    const link = spectator.hostElement.getElementsByTagName('kirby-text-link');
    expect(link[0]).toHaveComputedStyle({ cursor: 'pointer' });
  });
  describe('Test TextLink sizes', () => {
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

  describe('Test TextLink with icon', () => {
    interface TestCase {
      name: string;
      value: string;
      expected_font: string;
      expected_padding_right: string;
      expected_padding_left: string;
    }
    it('should render a text link with a icon', () => {
      spectator = createHost(
        `<kirby-text-link  text='Some Link' link='https://angular.io/api/router/RouterLink'></kirby-text-link>`
      );
      const icon = spectator.queryHost<HTMLElement>('kirby-icon');
      expect(icon).toBeTruthy();
    });
    it('should render the icon named [link]', () => {
      spectator = createHost(
        `<kirby-text-link  text='Some Link' link='https://angular.io/api/router/RouterLink'></kirby-text-link>`
      );
      const icon = spectator.queryHost<HTMLElement>('kirby-icon');

      const IconName = icon.getAttribute('name');
      expect(IconName).toBe('link');
    });

    it('should render the icon to the right from the text', () => {
      spectator = createHost(
        `<kirby-text-link  text='Some Link' link='https://angular.io/api/router/RouterLink'></kirby-text-link>`
      );
      const icon = spectator.queryHost<HTMLElement>('kirby-icon');
      const text = spectator.queryHost<HTMLElement>('a');
      const textPosition = text.getBoundingClientRect();
      console.log('textPosition', textPosition);
      const iconPosition = icon.getBoundingClientRect();
      console.log('iconPosition', iconPosition);
      expect(textPosition.right).toBeLessThan(iconPosition.right);
    });
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
});
