import { Component } from '@angular/core';

import { CopyTokenDirective } from '../../shared/copy-token/copy-token.directive';

interface TokenEntry {
  name: string;
  cssVar: string;
}

@Component({
  selector: 'cookbook-borders-elevation-showcase',
  templateUrl: './borders-elevation-showcase.component.html',
  styleUrls: ['./borders-elevation-showcase.component.scss'],
  imports: [CopyTokenDirective],
})
export class BordersElevationShowcaseComponent {
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

  elevations: TokenEntry[] = [
    { name: '2', cssVar: '--kirby-elevation-2' },
    { name: '4', cssVar: '--kirby-elevation-4' },
    { name: '8', cssVar: '--kirby-elevation-8' },
  ];
}
