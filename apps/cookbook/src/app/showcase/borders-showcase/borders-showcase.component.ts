import { Component } from '@angular/core';

import { CopyTokenDirective } from '../../shared/copy-token/copy-token.directive';

interface TokenEntry {
  name: string;
  cssVar: string;
}

@Component({
  selector: 'cookbook-borders-showcase',
  templateUrl: './borders-showcase.component.html',
  styleUrls: ['./borders-showcase.component.scss'],
  imports: [CopyTokenDirective],
})
export class BordersShowcaseComponent {
  borderRadii: TokenEntry[] = [
    { name: 'xxs', cssVar: '--kirby-border-radius-xxs' },
    { name: 'xs', cssVar: '--kirby-border-radius-xs' },
    { name: 's', cssVar: '--kirby-border-radius-s' },
    { name: 'n', cssVar: '--kirby-border-radius-n' },
    { name: 'l', cssVar: '--kirby-border-radius-l' },
    { name: 'xl', cssVar: '--kirby-border-radius-xl' },
    { name: 'circle', cssVar: '--kirby-border-radius-circle' },
    { name: 'pill', cssVar: '--kirby-border-radius-pill' },
  ];
}
