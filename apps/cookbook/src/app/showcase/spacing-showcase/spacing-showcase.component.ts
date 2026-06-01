import { Component } from '@angular/core';

import { CopyTokenButtonComponent } from '../../shared/copy-token/copy-token-button.component';
import { CopyTokenDirective } from '../../shared/copy-token/copy-token.directive';
import { TokenEntry } from '../../shared/token-entry';

@Component({
  selector: 'cookbook-spacing-showcase',
  templateUrl: './spacing-showcase.component.html',
  styleUrls: ['./spacing-showcase.component.scss'],
  imports: [CopyTokenButtonComponent, CopyTokenDirective],
})
export class SpacingShowcaseComponent {
  spacings: TokenEntry[] = [
    { name: 'xxxxxl', cssVar: '--kirby-spacing-xxxxxl', description: '72px' },
    { name: 'xxxxl', cssVar: '--kirby-spacing-xxxxl', description: '64px' },
    { name: 'xxxl', cssVar: '--kirby-spacing-xxxl', description: '56px' },
    { name: 'xxl', cssVar: '--kirby-spacing-xxl', description: '48px' },
    { name: 'xl', cssVar: '--kirby-spacing-xl', description: '40px' },
    { name: 'l', cssVar: '--kirby-spacing-l', description: '32px' },
    { name: 'm', cssVar: '--kirby-spacing-m', description: '24px' },
    { name: 's', cssVar: '--kirby-spacing-s', description: '16px' },
    { name: 'xs', cssVar: '--kirby-spacing-xs', description: '12px' },
    { name: 'xxs', cssVar: '--kirby-spacing-xxs', description: '8px' },
    { name: 'xxxs', cssVar: '--kirby-spacing-xxxs', description: '4px' },
    { name: 'xxxxs', cssVar: '--kirby-spacing-xxxxs', description: '2px' },
  ];
}
