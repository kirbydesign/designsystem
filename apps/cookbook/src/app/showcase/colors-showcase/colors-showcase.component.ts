import { Component } from '@angular/core';

import { ColorHelper, KirbyColor } from '@kirbydesign/designsystem';

@Component({
  selector: 'cookbook-colors-showcase',
  templateUrl: './colors-showcase.component.html',
  styleUrls: ['./colors-showcase.component.scss'],
})
export class ColorsShowcaseComponent {
  selectedColor = 'primary';
  selectedOnColor = 'primary-contrast';
  brandColors = ColorHelper.brandColors;
  notificationColors = ColorHelper.notificationColors;
  decorationColors = ColorHelper.decorationColors;
  systemColors = ColorHelper.systemColors;
  textColors = ColorHelper.textColors;

  onColorClick(color: KirbyColor) {
    this.selectedColor = color.name;
    this.selectedOnColor = color.name + '-contrast';
  }

  async onDecorationColorClick(event: UIEvent, name: string, step: number) {
    const colorVariable = this.getDecorationColorVariable(name, step);
    await navigator.clipboard.writeText(colorVariable);
    const stepElement = event.target as HTMLElement;
    stepElement.classList.add('copied');
    window.setTimeout(() => {
      stepElement.classList.remove('copied');
    }, 1500);
  }

  getDecorationColorVariable(name: string, step: number) {
    return `var(--kirby-decoration-color-${name}-${step})`;
  }
}
