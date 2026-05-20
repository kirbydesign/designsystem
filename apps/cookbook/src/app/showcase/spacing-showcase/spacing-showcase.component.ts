import { Component } from '@angular/core';

import { CopyTokenDirective } from '../../shared/copy-token/copy-token.directive';

interface TokenEntry {
  name: string;
  cssVar: string;
}

@Component({
  selector: 'cookbook-spacing-showcase',
  templateUrl: './spacing-showcase.component.html',
  styleUrls: ['./spacing-showcase.component.scss'],
  imports: [CopyTokenDirective],
})
export class SpacingShowcaseComponent {
  spacings: TokenEntry[] = [
    { name: 'xxxxxl', cssVar: '--kirby-spacing-xxxxxl' },
    { name: 'xxxxl', cssVar: '--kirby-spacing-xxxxl' },
    { name: 'xxxl', cssVar: '--kirby-spacing-xxxl' },
    { name: 'xxl', cssVar: '--kirby-spacing-xxl' },
    { name: 'xl', cssVar: '--kirby-spacing-xl' },
    { name: 'l', cssVar: '--kirby-spacing-l' },
    { name: 'm', cssVar: '--kirby-spacing-m' },
    { name: 's', cssVar: '--kirby-spacing-s' },
    { name: 'xs', cssVar: '--kirby-spacing-xs' },
    { name: 'xxs', cssVar: '--kirby-spacing-xxs' },
    { name: 'xxxs', cssVar: '--kirby-spacing-xxxs' },
    { name: 'xxxxs', cssVar: '--kirby-spacing-xxxxs' },
  ];
}
