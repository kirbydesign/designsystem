import { Component, Inject, ViewContainerRef } from '@angular/core';

import { ModalController } from '~/kirby/components/modal/services/modal.controller';
import { ModalWrapperConfig } from '~/kirby/components/modal/modal-wrapper/config/modal-wrapper-config';
import { SecondEmbeddedModalExampleComponent } from '../second-embedded-modal-example/second-embedded-modal-example.component';
import { COMPONENT_PROPS } from '~/kirby';

@Component({
  templateUrl: './first-embedded-modal-example.component.html',
})
export class FirstEmbeddedModalExampleComponent {
  props: object;

  constructor(
    @Inject(COMPONENT_PROPS) private componentProps,
    private modalController: ModalController,
    private vcRef: ViewContainerRef
  ) {
    this.props = componentProps;
  }

  async showSecondModal() {
    const config: ModalWrapperConfig = {
      title: 'Second Embedded Modal',
      titleHorizontalAlignment: 'left',
      closeIconName: 'arrow-back',
      component: SecondEmbeddedModalExampleComponent,
    };

    // supposing no callback needed for the second component
    this.modalController.showModal(config, this.vcRef);
  }

  onHideFirst() {
    let someTestData: number = Math.PI;
    this.modalController.hideTopmost(someTestData);
  }
}
