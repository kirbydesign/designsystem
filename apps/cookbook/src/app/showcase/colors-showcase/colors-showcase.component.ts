import { Component } from '@angular/core';

import { CopyTokenComponent } from '../../shared/copy-token/copy-token.component';

type ColorProperty = 'fill' | 'content' | 'border';

interface ColorTokenGroup {
  name: string;
  description: string;
  property: ColorProperty;
  tokens: { name: string; cssVar: string }[];
}

interface DecorationColorGroup {
  hue: string;
  tokens: { name: string; cssVar: string; step: number }[];
}

const STATUS_ROLES = ['success', 'warning', 'danger'];
const STATUS_EMPHASES = ['-loud', '', '-quiet'];

function statusTokens() {
  return STATUS_ROLES.flatMap((role) => STATUS_EMPHASES.map((emphasis) => `${role}${emphasis}`));
}

function group(
  property: ColorProperty,
  name: string,
  description: string,
  tokenNames: string[]
): ColorTokenGroup {
  return {
    name,
    description,
    property,
    tokens: tokenNames.map((tokenName) => ({
      name: tokenName,
      cssVar: `--kirby-color-${property}-${tokenName}`,
    })),
  };
}

@Component({
  selector: 'cookbook-colors-showcase',
  templateUrl: './colors-showcase.component.html',
  styleUrls: ['./colors-showcase.component.scss'],
  imports: [CopyTokenComponent],
})
export class ColorsShowcaseComponent {
  surfaces = ['base', 'raised', 'brand'];

  colorGroups: ColorTokenGroup[] = [
    group('fill', 'Fill', 'Backgrounds of surfaces, controls and status indicators.', [
      'base',
      'base-quiet',
      'raised',
      'brand-loud',
      'brand',
      'engaged',
      'neutral',
      ...statusTokens(),
    ]),
    group('content', 'Content', 'Text and icons. Pair with the fill of the same role.', [
      'base-loud',
      'base',
      'base-quiet',
      'raised-loud',
      'raised',
      'raised-quiet',
      'brand-loud',
      'brand',
      'engaged',
      'neutral',
      'positive',
      'negative',
      ...statusTokens(),
    ]),
    group('border', 'Border', 'Outlines, dividers and focus indication.', [
      'base-loud',
      'base',
      'base-quiet',
      'base-silent',
      'raised-loud',
      'raised',
      'raised-quiet',
      'raised-silent',
      'raised-danger',
      'brand-loud',
      'brand',
      'brand-quiet',
      'engaged',
      'neutral',
      'focus',
      'offset',
      ...statusTokens(),
    ]),
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
