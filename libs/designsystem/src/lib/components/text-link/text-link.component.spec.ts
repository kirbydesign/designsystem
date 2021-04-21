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

  describe(`should be`, () => {
    beforeEach(() => {
      spectator = createHost(`<kirby-text-link text='Some Link'></kirby-text-link>`);
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

    it('should have a link icon', () => {
      const anchor = spectator.queryHost<HTMLAnchorElement>('a');
      const baseURI = window.document.baseURI;

      expect(anchor).toHaveComputedStyle({
        'background-image': `url("${baseURI}assets/kirby/icons/svg/link.svg")`,
      });
    });
  });

  describe('size and padding', () => {
    const testCases: { size: 'xs' | 'sm' | 'md'; expected: any }[] = [
      { size: 'xs', expected: { iconSize: size('s'), fontSize: fontSize('xs'), padding: '20px' } },
      { size: 'sm', expected: { iconSize: size('s'), fontSize: fontSize('s'), padding: '20px' } },
      { size: 'md', expected: { iconSize: size('m'), fontSize: fontSize('n'), padding: '28px' } },
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
            const anchor = spectator.queryHost<HTMLElement>('a');

            expect(anchor).toHaveComputedStyle({
              'background-size': scenario.expected.iconSize,
            });
          });

          it('should render anchor with correct font size', () => {
            const anchor = spectator.queryHost<HTMLElement>('a');

            expect(anchor).toHaveComputedStyle({
              'font-size': scenario.expected.fontSize,
            });
          });

          it('should have correct spacing between icon and text', () => {
            const anchor = spectator.queryHost<HTMLElement>('a');

            expect(anchor).toHaveComputedStyle({
              'padding-right': scenario.expected.padding,
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
