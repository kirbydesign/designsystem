import { Component, Input } from '@angular/core';
import { ModalExperimentalController } from '@kirbydesign/designsystem/components/modal-experimental/services/modal.controller';

export const showModalCodeSnippet = `constructor(private modalController: ModalExperimentalController) {}

showModal() {
  const config: ModalExperimentalConfig = {
    flavor: 'modal',
    component: YourEmbeddedModalComponent,
  };
  this.modalController.showModal(config);
}`;
@Component({
  templateUrl: './modal-controller-experimental-example.component.html',
})
export class ModalControllerExperimentalExampleComponent {
  constructor(private modalController: ModalExperimentalController) {}

  @Input() title = '';

  async close() {
    this.modalController.closeModal<{ title: string }>('cancel', {
      title: this.title,
    });
  }
}
