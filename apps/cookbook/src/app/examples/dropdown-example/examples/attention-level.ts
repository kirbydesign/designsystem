import { Component, Input } from '@angular/core';
import { CardComponent } from '@kirbydesign/designsystem/card';
import { DropdownComponent } from '@kirbydesign/designsystem/dropdown';

const config = {
  selector: 'cookbook-dropdown-example-attention-level',
  template: `<kirby-card hasPadding="true" class="attention-levels" [themeColor]="themeColor">
  <kirby-dropdown
    placeholder="Dropdown with attention level 2"
    aria-label="Choose your favorite fruit"
    attentionLevel="2"
    expand="block"
    [items]="items">
  </kirby-dropdown>

  <kirby-dropdown
    placeholder="Dropdown with attention level 3"
    aria-label="Choose your favorite fruit"
    attentionLevel="3"
    expand="block"
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
`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./dropdown-examples.shared.scss'],
  imports: [CardComponent, DropdownComponent],
})
export class DropdownExampleAttentionLevelComponent {
  template: string = config.template;
  items = ['Apple', 'Banana', 'Blackberry', 'Blueberry', 'Grapes'];
  themeColors = ['light', 'white', 'dark'];
  themeColor = 'white';

  onChange(value) {
    this.themeColor = value;
  }
}
