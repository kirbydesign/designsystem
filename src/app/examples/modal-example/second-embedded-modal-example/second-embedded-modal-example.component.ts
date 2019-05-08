import { Component } from '@angular/core';

import { ModalController } from '~/kirby/components/modal/services/modal.controller';

@Component({
  templateUrl: './second-embedded-modal-example.component.html',
})
export class SecondEmbeddedModalExampleComponent {
  constructor(private modalController: ModalController) {}

  onHideSecond() {
    this.modalController.hideWindow();
  }
}
