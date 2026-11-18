import { Component } from '@angular/core';
import { ItemComponent, LabelComponent } from '@kirbydesign/designsystem/item';
import { AvatarComponent } from '@kirbydesign/designsystem/avatar';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';
import { CheckboxComponent } from '@kirbydesign/designsystem/checkbox';
import { FlagComponent } from '@kirbydesign/designsystem/flag';
import { IconComponent } from '@kirbydesign/designsystem/icon';

const config = {
  selector: 'cookbook-item-example-text-resize-layout',
  template: `<kirby-item [disclosure]="'arrow-more'">
  <kirby-badge slot="outside" themeColor="warning" size="sm"></kirby-badge>
  <kirby-avatar slot="start" themeColor="light">
    <kirby-icon name="person"></kirby-icon>
  </kirby-avatar>
  <kirby-label>
    <p class="kirby-item-title">Item with start and end slot content.</p>
    <p class="kirby-item-subtitle">Subtitle</p>
  </kirby-label>
  <kirby-flag slot="end" themeColor="success">76.543,21</kirby-flag>
</kirby-item>

<kirby-item>
  <kirby-checkbox slot="start">
    <kirby-label>
      <p class="kirby-item-title">Item with Checkbox.</p>
      <p class="kirby-item-detail">Label</p>
    </kirby-label>
  </kirby-checkbox>
</kirby-item>

<kirby-item class="kirby-item-layout-wrap-opt-in">
  <kirby-checkbox slot="start"></kirby-checkbox>
  <kirby-label>
    <p class="kirby-item-title">Complex item with checkbox and flag.</p>
    <p class="kirby-item-subtitle">Subtitle</p>
  </kirby-label>
  <kirby-flag slot="end" themeColor="success">76.543,21</kirby-flag>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./_shared.scss'],
  imports: [
    ItemComponent,
    LabelComponent,
    AvatarComponent,
    BadgeComponent,
    CheckboxComponent,
    FlagComponent,
    IconComponent,
  ],
})
export class ItemExampleTextResizeLayoutComponent {
  template: string = config.template;
}
