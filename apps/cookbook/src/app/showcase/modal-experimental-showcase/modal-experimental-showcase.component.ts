import { Component } from '@angular/core';
import { ModalExperimentalController } from '@kirbydesign/designsystem/components/modal-experimental/services/modal.controller';
import { ModalControllerExperimentalExampleComponent } from '../../examples/modal-experimental-example/controller/modal-controller-experimental-example.component';

@Component({
  selector: 'cookbook-modal-experimental-showcase',
  templateUrl: './modal-experimental-showcase.component.html',
})
export class ModalExperimentalShowcaseComponent {
  constructor(private modalController: ModalExperimentalController) {}

  openModal() {
    this.modalController.showModal({
      flavor: 'modal',
      component: ModalControllerExperimentalExampleComponent,
    });
  }
}
