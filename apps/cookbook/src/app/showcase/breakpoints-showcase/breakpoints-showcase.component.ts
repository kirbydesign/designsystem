import { Component } from '@angular/core';

import { CopyTokenComponent } from '../../shared/copy-token/copy-token.component';
import { TokenEntry } from '../../shared/token-entry';

@Component({
  selector: 'cookbook-breakpoints-showcase',
  templateUrl: './breakpoints-showcase.component.html',
  styleUrls: ['./breakpoints-showcase.component.scss'],
  imports: [CopyTokenComponent],
})
export class BreakpointsShowcaseComponent {
  breakpoints: TokenEntry[] = [
    { name: 'xsmall', cssVar: '--kirby-breakpoint-xsmall', description: '320px' },
    { name: 'small', cssVar: '--kirby-breakpoint-small', description: '632px' },
    { name: 'medium', cssVar: '--kirby-breakpoint-medium', description: '768px' },
    { name: 'large', cssVar: '--kirby-breakpoint-large', description: '992px' },
    { name: 'xlarge', cssVar: '--kirby-breakpoint-xlarge', description: '1440px' },
  ];
}
