import { Component, Inject } from '@angular/core';

import { ModalController } from '@kirbydesign/designsystem/modal';
import { ModalConfig } from '@kirbydesign/designsystem/modal';
import { SecondEmbeddedModalExampleComponent } from '../second-embedded-modal-example/second-embedded-modal-example.component';
import { COMPONENT_PROPS } from '@kirbydesign/designsystem/modal';

@Component({
  templateUrl: './empty-modal-example.component.html',
})
export class EmptyModalExampleComponent {
  props: { [key: string]: any };

  constructor(
    @Inject(COMPONENT_PROPS) private componentProps,
    private modalController: ModalController
  ) {
    this.props = componentProps;
  }

  onHideFirst() {
    let someTestData: number = Math.PI;
    this.modalController.hideTopmost(someTestData);
  }
}
