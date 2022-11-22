import { Component, Input } from '@angular/core';
import { ModalExperimentalController } from '@kirbydesign/designsystem/components/modal-experimental/services/modal.controller';

@Component({
  templateUrl: './modal-controller-experimental-example.component.html',
})
export class ModalControllerExperimentalExampleComponent {
  constructor(private modalController: ModalExperimentalController) {}

  @Input() title = '';

  async close() {
    this.modalController.closeModal();
  }
}
