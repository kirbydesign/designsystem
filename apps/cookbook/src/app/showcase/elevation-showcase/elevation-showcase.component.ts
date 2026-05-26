import { Component } from '@angular/core';

import { CopyTokenDirective } from '../../shared/copy-token/copy-token.directive';

interface TokenEntry {
  name: string;
  cssVar: string;
  description: string;
}

@Component({
  selector: 'cookbook-elevation-showcase',
  templateUrl: './elevation-showcase.component.html',
  styleUrls: ['./elevation-showcase.component.scss'],
  imports: [CopyTokenDirective],
})
export class ElevationShowcaseComponent {
  elevations: TokenEntry[] = [
    {
      name: '2',
      cssVar: '--kirby-elevation-2',
      description: 'Subtle shadow, used for cards and interactive surfaces like input or textarea.',
    },
    {
      name: '4',
      cssVar: '--kirby-elevation-4',
      description:
        'Moderate shadow, used for most interactive elements like dropdown, radio, checkbox.',
    },
    {
      name: '8',
      cssVar: '--kirby-elevation-8',
      description: 'Prominent shadow, used for overlays like modals and drawers.',
    },
  ];
}
