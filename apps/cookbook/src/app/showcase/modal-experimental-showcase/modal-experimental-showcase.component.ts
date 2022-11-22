import { Component } from '@angular/core';
import { ModalExperimentalController } from '@kirbydesign/designsystem/components/modal-experimental/services/modal.controller';
import { ModalControllerExperimentalExampleComponent } from '../../examples/modal-experimental-example/controller/modal-controller-experimental-example.component';

@Component({
  selector: 'cookbook-modal-experimental-showcase',
  templateUrl: './modal-experimental-showcase.component.html',
  styleUrls: ['./modal-experimental-showcase.component.scss'],
})
export class ModalExperimentalShowcaseComponent {
  constructor(private modalController: ModalExperimentalController) {}

  async openModal() {
    const modal = await this.modalController.showModal({
      flavor: 'modal',
      component: ModalControllerExperimentalExampleComponent,
      componentProps: {
        title: 'Hi there',
      },
    });

    const { data, role } = await modal.onWillDismiss();

    console.log('This is data and role', data, role);
  }
}
