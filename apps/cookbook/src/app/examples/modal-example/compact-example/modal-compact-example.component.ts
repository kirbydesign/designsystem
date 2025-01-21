import { Component, Optional, SkipSelf } from '@angular/core';

import { Modal } from '@kirbydesign/designsystem';
import { EmptyStateModule } from '@kirbydesign/designsystem/empty-state';
import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';
import { ButtonComponent } from '@kirbydesign/designsystem/button';

@Component({
  templateUrl: './modal-compact-example.component.html',
  imports: [EmptyStateModule, ThemeColorDirective, ButtonComponent],
})
export class ModalCompactExampleComponent {
  constructor(@Optional() @SkipSelf() private modal: Modal) {}

  onHideModal() {
    this.modal.close();
  }
}
