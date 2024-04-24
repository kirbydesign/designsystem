import { Component } from '@angular/core';
import { defaultIcons } from '@kirbydesign/designsystem';
import { Color, ColorHelper } from '@kirbydesign/designsystem';

const config = {
  selector: 'cookbook-icon-default-example',
  template: `<div>
  <div class="icon-item-container" *ngFor="let icon of icons">
    <div class="icon-item-inner-container">
      <kirby-icon class="copy-to-clipboard" [name]="icon" [title]="icon" [themeColor]="color?.name" (click)="onIconClick($event, icon)"></kirby-icon>
      <span class="icon-item-title">{{ icon }}</span>
    </div>
  </div>
<div>

  <p>Icons automatically inherit the value set via the <code>color</code> css property. You can experiment with various colors for the icons above here:</p>
  <div class="color-options">
    <button (click)="changeColor(color)" *ngFor="let color of colors" [ngClass]="color.name"></button>
  </div>
</div>
  `,
  htmlSnippet: `<kirby-icon name="NAME"></kirby-icon>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrl: './shared.scss',
})
export class IconDefaultExampleComponent {
  static htmlSnippet: string = config.htmlSnippet;
  icons = defaultIcons;
  color: Color;
  colors: Color[] = [...ColorHelper.brandColors, ...ColorHelper.notificationColors];

  changeColor(color: Color) {
    this.color = color;
  }

  async onIconClick(event: UIEvent, name: string) {
    const iconMarkup = `<kirby-icon name="${name}"></kirby-icon>`;
    await navigator.clipboard.writeText(iconMarkup);
    const iconElement = (event.target as HTMLElement).closest('kirby-icon');
    iconElement.classList.add('copied');
    window.setTimeout(() => {
      iconElement.classList.remove('copied');
    }, 1500);
  }
}
