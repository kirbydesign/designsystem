import { Component } from '@angular/core';

import { CopyTokenComponent } from '../../shared/copy-token/copy-token.component';
import { TokenEntry } from '../../shared/token-entry';

interface LineHeightEntry extends TokenEntry {
  fontSizeVar: string;
}

@Component({
  selector: 'cookbook-typography-showcase',
  templateUrl: './typography-showcase.component.html',
  styleUrls: ['./typography-showcase.component.scss'],
  imports: [CopyTokenComponent],
})
export class TypographyShowcaseComponent {
  fontSizes: TokenEntry[] = [
    { name: 'xxxxl', cssVar: '--kirby-font-size-xxxxl', description: '72px' },
    { name: 'xxxl', cssVar: '--kirby-font-size-xxxl', description: '56px' },
    { name: 'xxl', cssVar: '--kirby-font-size-xxl', description: '40px' },
    { name: 'xl', cssVar: '--kirby-font-size-xl', description: '32px' },
    { name: 'l', cssVar: '--kirby-font-size-l', description: '22px' },
    { name: 'm', cssVar: '--kirby-font-size-m', description: '18px' },
    { name: 'n', cssVar: '--kirby-font-size-n', description: '16px' },
    { name: 's', cssVar: '--kirby-font-size-s', description: '14px' },
    { name: 'xs', cssVar: '--kirby-font-size-xs', description: '12px' },
    { name: 'xxs', cssVar: '--kirby-font-size-xxs', description: '10px' },
  ];

  fontWeights: TokenEntry[] = [
    { name: 'black', cssVar: '--kirby-font-weight-black', description: '900' },
    { name: 'bold', cssVar: '--kirby-font-weight-bold', description: '700' },
    { name: 'medium', cssVar: '--kirby-font-weight-medium', description: '500' },
    { name: 'normal', cssVar: '--kirby-font-weight-normal', description: '400' },
    { name: 'light', cssVar: '--kirby-font-weight-light', description: '300' },
  ];

  lineHeights: LineHeightEntry[] = [
    {
      name: 'xl',
      cssVar: '--kirby-line-height-xl',
      description: '38px',
      fontSizeVar: '--kirby-font-size-xl',
    },
    {
      name: 'l',
      cssVar: '--kirby-line-height-l',
      description: '28px',
      fontSizeVar: '--kirby-font-size-l',
    },
    {
      name: 'm',
      cssVar: '--kirby-line-height-m',
      description: '24px',
      fontSizeVar: '--kirby-font-size-m',
    },
    {
      name: 'n',
      cssVar: '--kirby-line-height-n',
      description: '24px',
      fontSizeVar: '--kirby-font-size-n',
    },
    {
      name: 's',
      cssVar: '--kirby-line-height-s',
      description: '20px',
      fontSizeVar: '--kirby-font-size-s',
    },
    {
      name: 'xs',
      cssVar: '--kirby-line-height-xs',
      description: '16px',
      fontSizeVar: '--kirby-font-size-xs',
    },
    {
      name: 'xxs',
      cssVar: '--kirby-line-height-xxs',
      description: '11px',
      fontSizeVar: '--kirby-font-size-xxs',
    },
  ];
}
