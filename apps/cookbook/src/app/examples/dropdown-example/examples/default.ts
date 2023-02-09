import { Component, Input } from '@angular/core';

const config = {
  selector: 'cookbook-dropdown-example-default',
  template: `<div class="relative-wrapper">
  <kirby-dropdown
  [size]="size"
  placeholder="Dropdown with plain text"
  [items]="['Item 1','Item 2','Item 3','Item 4','Item 5']"
></kirby-dropdown>
</div>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styles: [
    `
      .relative-wrapper {
        position: relative;
        overflow: hidden;
        background-color: gold;
      }
    `,
  ],
})
export class DropdownExampleDefaultComponent {
  template: string = config.template;
  @Input() size: string;
}
