import { Component, Inject, Optional, SkipSelf } from '@angular/core';

import { COMPONENT_PROPS, Modal } from '@kirbydesign/designsystem';

@Component({
  templateUrl: './second-embedded-modal-example.component.html',
})
export class SecondEmbeddedModalExampleComponent {
  constructor(
    @Inject(COMPONENT_PROPS) public componentProps,
    @Optional() @SkipSelf() private modal: Modal
  ) {}

  close() {
    this.modal.close();
  }
}
