import { Component, Input } from '@angular/core';
import { ModalV2Controller } from '@kirbydesign/designsystem/modal/v2';

export const showModalCodeSnippet = `constructor(private modalController: ModalV2Controller) {}

showModal() {
  const config: ModalV2Config = {
    flavor: 'modal',
    component: YourEmbeddedModalComponent,
  };
  this.modalController.showModal(config);
}`;

export const observableCodeSnippet = `constructor(private modalController: ModalV2Controller) {}

showModal() {
  const config: ModalV2Config = {
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
  
  constructor(private modalController: ModalV2Controller) {}

  close() {
    this.modalController.closeModal({
      title: 'myTitle',
      items: [{id: 1}, {id: 2}]
    }, 'confirm');
  }
}`;
@Component({
  templateUrl: './modal-controller-v2-example.component.html',
})
export class ModalControllerV2ExampleComponent {
  constructor(private modalController: ModalV2Controller) {}

  @Input() title = '';

  close(role: string) {
    this.modalController.closeModal({ title: this.title }, role);
  }
}
