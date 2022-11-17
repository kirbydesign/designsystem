import { Component, ViewChild } from '@angular/core';
import { FullscreenModalExperimentalComponent } from '@kirbydesign/designsystem/components/modal-experimental/fullscreen/fullscreen.component';
import { KirbyAnimation } from '@kirbydesign/designsystem';

@Component({
  templateUrl: './fullscreen-experimental-example.component.html',
})
export class FullscreenModalExperimentalExampleComponent {
  @ViewChild(FullscreenModalExperimentalComponent) modal: FullscreenModalExperimentalComponent;

  open = false;
  canDismiss = true;

  openModal() {
    this.open = true;
  }

  close() {
    this.open = false;
  }

  scrollToTop() {
    this.modal.scrollToTop(KirbyAnimation.Duration.LONG);
  }

  scrollToBottom() {
    this.modal.scrollToBottom(KirbyAnimation.Duration.LONG);
  }

  toggleCanDismiss() {
    this.canDismiss = !this.canDismiss;
  }
}
