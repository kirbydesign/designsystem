import { Component } from '@angular/core';
import { IconSize } from '@kirbydesign/designsystem';

const config = {
  selector: 'cookbook-icon-sizes-example',
  template: `<div class="icon-item-container" *ngFor="let size of sizes | keyvalue">
  <div class="icon-item-inner-container">
    <kirby-icon name="person" [size]="size.value" [title]="size.value"></kirby-icon>
    <span class="icon-item-title">{{ size.value }}</span>
  </div>
</div>`,
  htmlSnippet: `<kirby-icon name="person" size="lg"></kirby-icon>
<kirby-icon name="person" size="md"></kirby-icon>
<kirby-icon name="person" size="sm"></kirby-icon>
<kirby-icon name="person" size="xs"></kirby-icon>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrl: './shared.scss',
})
export class IconSizesExampleComponent {
  static htmlSnippet: string = config.htmlSnippet;

  sizes = IconSize;
}
