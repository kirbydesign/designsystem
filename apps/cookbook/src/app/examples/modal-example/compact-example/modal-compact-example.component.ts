import { Component } from '@angular/core';

import { ModalController } from '@kirbydesign/designsystem/modal';

@Component({
  templateUrl: './modal-compact-example.component.html',
})
export class ModalCompactExampleComponent {
  constructor(private modalController: ModalController) {}

  onHideModal() {
    this.modalController.hideTopmost();
  }
}
