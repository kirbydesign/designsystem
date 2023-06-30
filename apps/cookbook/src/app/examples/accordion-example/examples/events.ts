import { Component } from '@angular/core';

import { ToastConfig, ToastController } from '@kirbydesign/designsystem';
const config = {
  selector: 'cookbook-accordion-events-example',
  template: `<kirby-accordion>
  <kirby-accordion-item title="Title for accordion item 1" [isExpanded]="true" (toggle)="onToggleChange($event, 'item 1')">
    Click item to see "toggle" event in action
  </kirby-accordion-item>
  <kirby-accordion-item title="Title for accordion item 2" (toggle)="onToggleChange($event, 'item 2')">
    Click item to see "toggle" event in action
  </kirby-accordion-item>
</kirby-accordion>`,
  codeSnippet: `onToggleChange(isOpen: boolean, item: string) {
  ...
}`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class AccordionEventsExampleComponent {
  template: string = config.template;
  codeSnippet: string = config.codeSnippet;
  constructor(private toastController: ToastController) {}

  onToggleChange(isOpen: boolean, item: string) {
    const config: ToastConfig = {
      message: `Accordion ${item} toggled - is open: ${isOpen}`,
      messageType: isOpen ? 'success' : 'warning',
      durationInMs: 1500,
    };
    this.toastController.showToast(config);
  }
}
