import { Component, Optional, SkipSelf } from '@angular/core';

import { Modal } from '@kirbydesign/designsystem/modal';

@Component({
  templateUrl: './modal-compact-example.component.html',
})
export class ModalCompactExampleComponent {
  constructor(@Optional() @SkipSelf() private modal: Modal) {}

  onHideModal() {
    this.modal.close();
  }
}
