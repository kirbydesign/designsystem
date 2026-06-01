import { Component } from '@angular/core';

import { CopyTokenComponent } from '../../shared/copy-token/copy-token.component';
import { TokenEntry } from '../../shared/token-entry';

@Component({
  selector: 'cookbook-borders-showcase',
  templateUrl: './border-radius-showcase.component.html',
  styleUrls: ['./border-radius-showcase.component.scss'],
  imports: [CopyTokenComponent],
})
export class BorderRadiusShowcaseComponent {
  borderRadii: TokenEntry[] = [
    { name: 'xxs', cssVar: '--kirby-border-radius-xxs', description: '2px' },
    { name: 'xs', cssVar: '--kirby-border-radius-xs', description: '4px' },
    { name: 's', cssVar: '--kirby-border-radius-s', description: '8px' },
    { name: 'n', cssVar: '--kirby-border-radius-n', description: '16px' },
    { name: 'l', cssVar: '--kirby-border-radius-l', description: '24px' },
    { name: 'xl', cssVar: '--kirby-border-radius-xl', description: '32px' },
    { name: 'circle', cssVar: '--kirby-border-radius-circle', description: '50%' },
    { name: 'pill', cssVar: '--kirby-border-radius-pill', description: '999px' },
  ];
}
