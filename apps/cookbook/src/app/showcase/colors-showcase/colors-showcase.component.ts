import { Component } from '@angular/core';

import { CopyTokenDirective } from '../../shared/copy-token/copy-token.directive';

interface ColorTokenEntry {
  name: string;
  cssVar: string;
}

interface DecorationColorGroup {
  hue: string;
  tokens: { name: string; cssVar: string; step: number }[];
}

@Component({
  selector: 'cookbook-colors-showcase',
  templateUrl: './colors-showcase.component.html',
  styleUrls: ['./colors-showcase.component.scss'],
  imports: [CopyTokenDirective],
})
export class ColorsShowcaseComponent {
  brandColors: ColorTokenEntry[] = [
    { name: 'primary', cssVar: '--kirby-primary' },
    { name: 'secondary', cssVar: '--kirby-secondary' },
    { name: 'tertiary', cssVar: '--kirby-tertiary' },
  ];

  notificationColors: ColorTokenEntry[] = [
    { name: 'success', cssVar: '--kirby-success' },
    { name: 'warning', cssVar: '--kirby-warning' },
    { name: 'danger', cssVar: '--kirby-danger' },
  ];

  systemColors: ColorTokenEntry[] = [
    { name: 'background-color', cssVar: '--kirby-background-color' },
    { name: 'white', cssVar: '--kirby-white' },
    { name: 'light', cssVar: '--kirby-light' },
    { name: 'semi-light', cssVar: '--kirby-semi-light' },
    { name: 'medium', cssVar: '--kirby-medium' },
    { name: 'semi-dark', cssVar: '--kirby-semi-dark' },
    { name: 'dark', cssVar: '--kirby-dark' },
    { name: 'black', cssVar: '--kirby-black' },
  ];

  textColors: ColorTokenEntry[] = [
    { name: 'white', cssVar: '--kirby-text-color-white' },
    { name: 'semi-dark', cssVar: '--kirby-text-color-semi-dark' },
    { name: 'black', cssVar: '--kirby-text-color-black' },
    { name: 'danger', cssVar: '--kirby-text-color-danger' },
    { name: 'positive', cssVar: '--kirby-text-color-positive' },
    { name: 'negative', cssVar: '--kirby-text-color-negative' },
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
