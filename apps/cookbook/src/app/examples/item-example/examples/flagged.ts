import { Component } from '@angular/core';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';
import { FlagComponent } from '@kirbydesign/designsystem/flag';

const config = {
  selector: 'cookbook-item-example-flagged',
  template: `<kirby-item>
  <div slot="outside">
    <kirby-badge themeColor="success" size="sm"></kirby-badge>
    <kirby-badge themeColor="warning" size="sm"></kirby-badge>
  </div>
  <kirby-label>
    <p class="kirby-text-normal-bold">Title</p>
    <p class="kirby-item-detail">Detail</p>
  </kirby-label>
  <kirby-flag slot="end" themeColor="success">
    <data value="60.0">60</data>
  </kirby-flag>
</kirby-item>`,
  styles: [
    `div[slot="outside"] {
  display: flex;
  flex-direction: column;
}`,
  ],
};

@Component({
  selector: config.selector,
  template: config.template,
  styles: config.styles,
  imports: [ItemModule, ThemeColorDirective, BadgeComponent, FlagComponent],
})
export class ItemExampleFlaggedComponent {
  template: string = config.template;
  styles: string = config.styles[0];
}
