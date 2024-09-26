import { Component, Input } from '@angular/core';

import { ThemeColor } from '@kirbydesign/designsystem';

const config = {
  selector: 'cookbook-button-example-attention-level',
  template: `<kirby-card [hasPadding]="true" [themeColor]="cardThemeColor" [variant]="cardVariant">
  <button kirby-button attentionLevel="1" expand="block">
    Attention Level 1
  </button>
  <button kirby-button attentionLevel="2" expand="block">
    Attention Level 2
  </button>
  <button kirby-button attentionLevel="3" expand="block">
    Attention Level 3
  </button>
</kirby-card>
<fieldset>
  <legend>Configuration</legend>
  <kirby-dropdown
    [items]="themeColors"
    [selectedIndex]="0"
    size="sm"
    (change)="onThemeColorChange($event.value)">
  </kirby-dropdown>
</fieldset>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrl: './attention-level.scss',
})
export class ButtonExampleAttentionLevelComponent {
  template: string = config.template.split('<fieldset')[0];

  themeColors: { text: string; value: ThemeColor }[] = [
    { text: 'Card color: light', value: 'light' },
    { text: 'Card color: white', value: 'white' },
    { text: 'Card color: dark', value: 'dark' },
  ];

  @Input() cardThemeColor: ThemeColor = this.themeColors[0].value;

  get cardVariant(): 'elevated' | 'flat' | 'outlined' {
    return this.cardThemeColor === 'light' ? 'outlined' : 'elevated';
  }

  onThemeColorChange(value: ThemeColor) {
    this.cardThemeColor = value;
  }
}
