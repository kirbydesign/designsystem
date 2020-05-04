import { Component, Optional, SkipSelf } from '@angular/core';

import { Modal } from '@kirbydesign/designsystem';

@Component({
  templateUrl: './second-embedded-modal-example.component.html',
})
export class SecondEmbeddedModalExampleComponent {
  constructor(@Optional() @SkipSelf() private modal: Modal) {}

  close() {
    this.modal.close();
  }
}
