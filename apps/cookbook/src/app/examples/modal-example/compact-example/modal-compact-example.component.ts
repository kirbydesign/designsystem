import { Component, Optional, SkipSelf } from '@angular/core';

import { Modal } from '@kirbydesign/designsystem';

const config = {
  ariaLabelPropertyCodeSnippet: `constructor(@Optional() @SkipSelf() private modal: Modal) {
  this.modal.ariaLabel = 'My Custom Accessible Title';
}`,
};
@Component({
  templateUrl: './modal-compact-example.component.html',
})
export class ModalCompactExampleComponent {
  static readonly ariaLabelPropertyCodeSnippet = config.ariaLabelPropertyCodeSnippet;

  constructor(@Optional() @SkipSelf() private modal: Modal) {}

  onHideModal() {
    this.modal.close();
  }
}
