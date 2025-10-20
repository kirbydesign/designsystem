import { Component } from '@angular/core';
import { IconSize } from '@kirbydesign/designsystem';
import { KeyValuePipe } from '@angular/common';
import { IconComponent } from '@kirbydesign/designsystem/icon';

const config = {
  selector: 'cookbook-icon-sizes-example',
  template: `@for (size of sizes | keyvalue; track size.key) {
  <div class="icon-item-container">
    <div class="icon-item-inner-container">
      <kirby-icon name="person" [size]="size.value" [title]="size.value"></kirby-icon>
      <span class="icon-item-title">{{ size.value }}</span>
    </div>
  </div>
}`,
  htmlSnippet: `<kirby-icon name="person" size="lg"></kirby-icon>
<kirby-icon name="person" size="md"></kirby-icon>
<kirby-icon name="person" size="sm"></kirby-icon>
<kirby-icon name="person" size="xs"></kirby-icon>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrl: './shared.scss',
  imports: [IconComponent, KeyValuePipe],
})
export class IconSizesExampleComponent {
  static htmlSnippet: string = config.htmlSnippet;

  sizes = IconSize;
}
