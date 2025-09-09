import { Component, Input } from '@angular/core';
import { CardModule } from '@kirbydesign/designsystem/card';
import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';
import { DropdownModule } from '@kirbydesign/designsystem/dropdown';

import { FormsModule } from '@angular/forms';

const config = {
  selector: 'cookbook-dropdown-example-attention-level',
  template: `<kirby-card hasPadding="true" class="attention-levels" [themeColor]="themeColor">
  <kirby-dropdown
    [size]="size"
    placeholder="Dropdown with attention level 1"
    aria-label="Choose your favorite fruit"
    attentionLevel="1"
    expand="block"
    usePopover="true"
    [items]="items">
    </kirby-dropdown>

    <kirby-dropdown
    [size]="size"
    placeholder="Dropdown with attention level 2"
    aria-label="Choose your favorite fruit"
    attentionLevel="2"
    expand="block"
    usePopover="true"
    [items]="items">
  </kirby-dropdown>

  <kirby-dropdown
    [size]="size"
    placeholder="Dropdown with attention level 3"
    aria-label="Choose your favorite fruit"
    attentionLevel="3"
    expand="block"
    usePopover="true"
    [items]="items">
  </kirby-dropdown>
</kirby-card>

<div>
<select (change)="onChange($event.target.value)">
  @for (color of themeColors; track $index) {
    <option
      value="{{ color }}"
      [attr.selected]="themeColor === color ? true : null"
    >
      Card color: {{ color }}
    </option>
  }
</select>
</div>

<p class="comment small">
  <em
    ><strong>Please note</strong>, these examples have <code>usePopover</code> enabled to not be cut off by the card.
  </em>
</p>
`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./dropdown-examples.shared.scss'],
  imports: [CardModule, ThemeColorDirective, DropdownModule, FormsModule],
})
export class DropdownExampleAttentionLevelComponent {
  template: string = config.template;
  items = ['Apple', 'Banana', 'Blackberry', 'Blueberry', 'Grapes'];
  themeColors = ['light', 'white', 'dark'];
  themeColor = 'white';

  @Input() size: string;

  onChange(value) {
    this.themeColor = value;
  }
}
