import { Component } from '@angular/core';

import { AsideComponent } from '../../shared/aside/aside.component';
import { CopyTokenDirective } from '../../shared/copy-token/copy-token.directive';
import { TokenEntry } from '../../shared/token-entry';

interface DecorationColorGroup {
  hue: string;
  tokens: { name: string; cssVar: string; step: number }[];
}

@Component({
  selector: 'cookbook-colors-showcase',
  templateUrl: './colors-showcase.component.html',
  styleUrls: ['./colors-showcase.component.scss'],
  imports: [AsideComponent, CopyTokenDirective],
})
export class ColorsShowcaseComponent {
  brandColors: TokenEntry[] = [
    { name: 'primary', cssVar: '--kirby-primary', description: 'Main brand color' },
    { name: 'secondary', cssVar: '--kirby-secondary', description: 'Supporting brand color' },
    { name: 'tertiary', cssVar: '--kirby-tertiary', description: 'Accent brand color' },
  ];

  notificationColors: TokenEntry[] = [
    { name: 'success', cssVar: '--kirby-success', description: 'Positive feedback' },
    { name: 'warning', cssVar: '--kirby-warning', description: 'Caution feedback' },
    { name: 'danger', cssVar: '--kirby-danger', description: 'Error or destructive' },
  ];

  systemColors: TokenEntry[] = [
    {
      name: 'background-color',
      cssVar: '--kirby-background-color',
      description: 'Page background',
    },
    { name: 'white', cssVar: '--kirby-white', description: 'Surface / card background' },
    { name: 'light', cssVar: '--kirby-light', description: 'Light neutral' },
    { name: 'semi-light', cssVar: '--kirby-semi-light', description: 'Borders, dividers' },
    { name: 'medium', cssVar: '--kirby-medium', description: 'Disabled / placeholder' },
    { name: 'semi-dark', cssVar: '--kirby-semi-dark', description: 'Secondary text' },
    { name: 'dark', cssVar: '--kirby-dark', description: 'Primary text' },
    { name: 'black', cssVar: '--kirby-black', description: 'Highest contrast' },
  ];

  textColors: TokenEntry[] = [
    { name: 'black', cssVar: '--kirby-text-color-black', description: 'Primary text' },
    { name: 'semi-dark', cssVar: '--kirby-text-color-semi-dark', description: 'Secondary text' },
    { name: 'white', cssVar: '--kirby-text-color-white', description: 'Text on dark backgrounds' },
    { name: 'danger', cssVar: '--kirby-text-color-danger', description: 'Error text' },
    { name: 'positive', cssVar: '--kirby-text-color-positive', description: 'Positive value text' },
    { name: 'negative', cssVar: '--kirby-text-color-negative', description: 'Negative value text' },
  ];

  decorationColorGroups: DecorationColorGroup[] = this.buildDecorationColorGroups();

  private buildDecorationColorGroups(): DecorationColorGroup[] {
    const hues = ['blue', 'green', 'purple', 'red', 'yellow', 'orange'];
    const steps = [10, 20, 30, 40, 50, 60, 70, 80, 90];
    return hues.map((hue) => ({
      hue,
      tokens: steps.map((step) => ({
        name: `${hue}-${step}`,
        cssVar: `--kirby-decoration-color-${hue}-${step}`,
        step,
      })),
    }));
  }
}
