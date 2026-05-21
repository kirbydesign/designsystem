import { Component } from '@angular/core';

import { CopyTokenDirective } from '../../shared/copy-token/copy-token.directive';

interface TokenEntry {
  name: string;
  cssVar: string;
  description: string;
}

@Component({
  selector: 'cookbook-breakpoints-showcase',
  templateUrl: './breakpoints-showcase.component.html',
  styleUrls: ['./breakpoints-showcase.component.scss'],
  imports: [CopyTokenDirective],
})
export class BreakpointsShowcaseComponent {
  breakpoints: TokenEntry[] = [
    { name: 'xsmall', cssVar: '--kirby-breakpoint-xsmall', description: '320px — mobile portrait' },
    { name: 'small', cssVar: '--kirby-breakpoint-small', description: '632px — mobile landscape' },
    { name: 'medium', cssVar: '--kirby-breakpoint-medium', description: '768px — tablet' },
    { name: 'large', cssVar: '--kirby-breakpoint-large', description: '992px — desktop' },
    { name: 'xlarge', cssVar: '--kirby-breakpoint-xlarge', description: '1440px — large desktop' },
  ];
}
