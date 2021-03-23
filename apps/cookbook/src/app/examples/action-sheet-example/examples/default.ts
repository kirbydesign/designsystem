import { Component } from '@angular/core';

import { ActionSheetItem } from '@kirbydesign/designsystem';

const config = {
  selector: 'cookbook-action-sheet-example-default',
  template: `<kirby-action-sheet 
  header="Your action sheet header" 
  subHeader="Your action sheet subheader"
  [items]="items"
  cancelButtonText="Custom cancel">
  </kirby-action-sheet>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ActionSheetExampleDefaultComponent {
  template: string = config.template;
  items: ActionSheetItem[] = [
    { id: '1', text: 'Option 1' },
    { id: '2', text: 'Option 2' },
    { id: '3', text: 'Option 3' },
  ];
}
