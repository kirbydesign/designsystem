import { Component } from '@angular/core';

import { ModalConfig, ModalController, ModalFlavor } from '@kirbydesign/designsystem';

import { ModalEmbeddedAlertExampleComponent } from './alert-example/modal-example-embedded-alert.component';

const config = {
  selector: 'cookbook-modal-example-alert',
  template: `<button kirby-button size="lg" (click)="showModal('modal')">Show modal (with alert)</button>`,
  codeSnippet: `constructor(private myService: MyService) {}

validate(): boolean | AlertConfig {
    if(this.myService.isDataValid()) return true;

    const config: AlertConfig = {
        title: 'Data is invalid',
        message: \`Check the following fields: \${this.myService.getInvalidFields()}\`,
        okBtn: 'Close',
        cancelBtn: 'Cancel',
        icon: {
          name: 'warning',
          themeColor: 'warning',
        },
      };
    
      return config;
  }

  openModal() {
    const config: ModalConfig = {
        component: EmbeddedComponent,
        // Use an arrow function to avoid 'this' being undefined in the function callback: 
        canDismiss: () => this.validate(),
    }

    this.modalController.showModal(config);
  }
`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./modal-example-simple.component.scss'],
})
export class ModalExampleAlertComponent {
  static readonly template = config.template;
  static readonly codeSnippet = config.codeSnippet;

  constructor(private modalController: ModalController) {}

  async showModal(flavor: ModalFlavor) {
    const config: ModalConfig = {
      component: ModalEmbeddedAlertExampleComponent,
      flavor,
      componentProps: {
        showStepper: false,
      },
    };

    await this.modalController.showModal(config);
  }
}
