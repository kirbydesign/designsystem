import { Component } from '@angular/core';

import { ToastConfig, ToastController } from '@kirbydesign/designsystem';

import { RadioModule } from '@kirbydesign/designsystem/radio';
import { stringifyPretty } from '~/app/shared/code-viewer/code-viewer.component';

const items = [
  { title: 'Bacon', value: 1 },
  { title: 'Salami', value: 2 },
  { title: 'Tenderloin', value: 3 },
  { title: 'Veggie (not an option)', value: 4, disabled: true },
];

const config = {
  selector: 'cookbook-radio-example-binding',
  template: `<kirby-radio-group
  aria-label="Select main course"
  [items]="items"
  itemTextProperty="title"
  [value]="selected"
  (valueChange)="onChange($event)">
</kirby-radio-group>`,
  twoWayBindingTemplate: `<kirby-radio-group [items]="items" [(value)]="selected"></kirby-radio-group>`,
  codeSnippet: `items = ${stringifyPretty(items)};

selected = this.items[0];

onChange(value: string | YourDataType) {
  ...
}`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [RadioModule],
})
export class RadioExampleBindingComponent {
  template: string = config.template;
  twoWayBindingTemplate: string = config.twoWayBindingTemplate;
  codeSnippet: string = config.codeSnippet;

  constructor(private toastController: ToastController) {}

  items = items;
  selected = this.items[0];

  onChange(item: { title: string; value: number }) {
    const config: ToastConfig = {
      message: `Item '${item.title} (value: ${item.value})' was selected.`,
      messageType: 'success',
      durationInMs: 1500,
    };
    this.toastController.showToast(config);
  }
}
