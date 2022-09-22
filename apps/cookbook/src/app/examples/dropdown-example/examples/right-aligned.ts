import { Component, Input } from '@angular/core';

const config = {
  selector: 'cookbook-dropdown-example-right-aligned',
  template: `<kirby-dropdown
  [size]="size"
  placeholder="Right aligned (opens left)"
  [items]="['Item 1','Item 2','Item 3','Item 4','Item 5']"
  popout="left"
></kirby-dropdown>`,
  styles: [
    `:host(.right-align) {
  display: flex;
}`,
    `kirby-dropdown {
  margin-left: auto;
}`,
  ],
};

@Component({
  selector: config.selector,
  template: config.template,
  styles: config.styles,

  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { '[class.right-align]': 'true' },
})
export class DropdownExampleRightAlignedComponent {
  template: string = config.template;
  styles: string = config.styles.join(`
`);
  @Input() size: string;
}
