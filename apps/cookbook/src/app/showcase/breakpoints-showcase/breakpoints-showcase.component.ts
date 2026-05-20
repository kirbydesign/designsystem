import { Component } from '@angular/core';

import { CopyTokenDirective } from '../../shared/copy-token/copy-token.directive';

interface TokenEntry {
  name: string;
  cssVar: string;
}

@Component({
  selector: 'cookbook-breakpoints-showcase',
  templateUrl: './breakpoints-showcase.component.html',
  styleUrls: ['./breakpoints-showcase.component.scss'],
  imports: [CopyTokenDirective],
})
export class BreakpointsShowcaseComponent {
  breakpoints: TokenEntry[] = [
    { name: 'xsmall', cssVar: '--kirby-breakpoint-xsmall' },
    { name: 'small', cssVar: '--kirby-breakpoint-small' },
    { name: 'medium', cssVar: '--kirby-breakpoint-medium' },
    { name: 'large', cssVar: '--kirby-breakpoint-large' },
    { name: 'xlarge', cssVar: '--kirby-breakpoint-xlarge' },
  ];
}
