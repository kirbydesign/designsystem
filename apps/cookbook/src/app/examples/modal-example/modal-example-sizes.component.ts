import { Component } from '@angular/core';

import { ModalConfig, ModalController, ModalSize } from '@kirbydesign/designsystem';

import { EmbeddedModalExampleComponent } from './embedded-modal-example/embedded-modal-example.component';

const config = {
  selector: 'cookbook-modal-example-sizes',
  template: `<button kirby-button (click)="showModal('small')">Show small modal</button>
  <button kirby-button (click)="showModal('medium')">Show medium modal</button>
  <button kirby-button (click)="showModal('large')">Show large modal</button>
  `,
  showModalCodeSnippet: `constructor(private modalController: ModalController) {}

showModal() {
  const config: ModalConfig = {
    flavor: 'modal',
    component: YourEmbeddedModalComponent,
    componentProps: {
      prop1: 'value1',
      prop2: 'value2'
    }
  };
  this.modalController.showModal(config);
}`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['modal-example-sizes.component.scss'],
})
export class ModalExampleSizesComponent {
  static readonly template = config.template.split('<cookbook-example-configuration-wrapper>')[0]; // Remove config part of the template
  static readonly defaultCodeSnippet = [config.showModalCodeSnippet].join('\n\n');
  static readonly showModalCodeSnippet = config.showModalCodeSnippet;

  modalSizeOptions = [
    { text: 'Small', value: 'small' },
    { text: 'Medium (default)', value: 'medium' },
    { text: 'Large', value: 'large' },
    { text: 'Full height (medium width only)', value: 'full-height' },
  ];

  constructor(private modalController: ModalController) {}

  async showModal(size: ModalSize) {
    const config: ModalConfig = {
      flavor: 'modal',
      component: EmbeddedModalExampleComponent,
      size: size,
      componentProps: {
        title: `Modal - ${size}`,
        subtitle: 'Hello from the first embedded example component!',
        showNestedOptions: true,
        modalSizeOptions: this.modalSizeOptions,
      },
    };

    await this.modalController.showModal(config);
  }
}
