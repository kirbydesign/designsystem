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

export const observableCodeSnippet = `constructor(private modalController: ModalExperimentalController) {}

showModal() {
  const config: ModalExperimentalConfig = {
    flavor: 'modal',
    component: YourEmbeddedModalComponent,
  };

  const modal = this.modalController.showModal(config);

  modal?.onWillDismiss.subscribe((response) => {
    const { role, data } = response;

    // role is: 'confirm'
    // data is: {
    //  title: 'myTitle',
    //  items: [{id: 1}, {id: 2}]
    }
  });

  modal?.onDidDismiss.subscribe((response) => {
    const { role, data } = response;

    // role is: 'confirm'
    // data is: {
    //  title: 'myTitle',
    //  items: [{id: 1}, {id: 2}]
    }
  });


  // Inside the embedded component
  
  constructor(private modalController: ModalExperimentalController) {}

  close() {
    this.modalController.closeModal({
      title: 'myTitle',
      items: [{id: 1}, {id: 2}]
    }, 'confirm');
  }
}`;
@Component({
  templateUrl: './modal-controller-experimental-example.component.html',
})
export class ModalControllerExperimentalExampleComponent {
  constructor(private modalController: ModalExperimentalController) {}

  @Input() title = '';

  close(role: string) {
    this.modalController.closeModal({ title: this.title }, role);
  }
}
