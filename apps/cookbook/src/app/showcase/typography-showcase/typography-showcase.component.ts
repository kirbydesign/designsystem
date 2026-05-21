import { Component } from '@angular/core';

import { CopyTokenDirective } from '../../shared/copy-token/copy-token.directive';

interface TokenEntry {
  name: string;
  cssVar: string;
}

interface LineHeightEntry {
  name: string;
  cssVar: string;
  fontSizeVar: string;
}

@Component({
  selector: 'cookbook-typography-showcase',
  templateUrl: './typography-showcase.component.html',
  styleUrls: ['./typography-showcase.component.scss'],
  imports: [CopyTokenDirective],
})
export class TypographyShowcaseComponent {
  fontSizes: TokenEntry[] = [
    { name: 'xxxxl', cssVar: '--kirby-font-size-xxxxl' },
    { name: 'xxxl', cssVar: '--kirby-font-size-xxxl' },
    { name: 'xxl', cssVar: '--kirby-font-size-xxl' },
    { name: 'xl', cssVar: '--kirby-font-size-xl' },
    { name: 'l', cssVar: '--kirby-font-size-l' },
    { name: 'm', cssVar: '--kirby-font-size-m' },
    { name: 'n', cssVar: '--kirby-font-size-n' },
    { name: 's', cssVar: '--kirby-font-size-s' },
    { name: 'xs', cssVar: '--kirby-font-size-xs' },
    { name: 'xxs', cssVar: '--kirby-font-size-xxs' },
  ];

  fontWeights: TokenEntry[] = [
    { name: 'black', cssVar: '--kirby-font-weight-black' },
    { name: 'bold', cssVar: '--kirby-font-weight-bold' },
    { name: 'medium', cssVar: '--kirby-font-weight-medium' },
    { name: 'normal', cssVar: '--kirby-font-weight-normal' },
    { name: 'light', cssVar: '--kirby-font-weight-light' },
  ];

  lineHeights: LineHeightEntry[] = [
    { name: 'xl', cssVar: '--kirby-line-height-xl', fontSizeVar: '--kirby-font-size-xl' },
    { name: 'l', cssVar: '--kirby-line-height-l', fontSizeVar: '--kirby-font-size-l' },
    { name: 'm', cssVar: '--kirby-line-height-m', fontSizeVar: '--kirby-font-size-m' },
    { name: 'n', cssVar: '--kirby-line-height-n', fontSizeVar: '--kirby-font-size-n' },
    { name: 's', cssVar: '--kirby-line-height-s', fontSizeVar: '--kirby-font-size-s' },
    { name: 'xs', cssVar: '--kirby-line-height-xs', fontSizeVar: '--kirby-font-size-xs' },
    { name: 'xxs', cssVar: '--kirby-line-height-xxs', fontSizeVar: '--kirby-font-size-xxs' },
  ];
}
