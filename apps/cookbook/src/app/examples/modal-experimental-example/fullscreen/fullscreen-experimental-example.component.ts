import { Component, ViewChild } from '@angular/core';
import { FullscreenModalExperimentalComponent } from '@kirbydesign/designsystem/components/modal-experimental/fullscreen/fullscreen.component';
import { KirbyAnimation } from '@kirbydesign/designsystem';

@Component({
  templateUrl: './fullscreen-experimental-example.component.html',
  styleUrls: ['./fullscreen-experimental-example.component.scss'],
})
export class FullscreenModalExperimentalExampleComponent {
  @ViewChild(FullscreenModalExperimentalComponent) modal: FullscreenModalExperimentalComponent;

  open = false;
  canDismiss = true;
  showFooter = true;
  showPageProgress = true;
  isInlineFooter = true;
  collapseTitle = true;

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

  toggleFooter() {
    this.showFooter = !this.showFooter;
  }

  togglePageProgress() {
    this.showPageProgress = !this.showPageProgress;
  }

  toggleIsInlineFooter() {
    this.isInlineFooter = !this.isInlineFooter;
  }

  toggleCollapseTitle() {
    this.collapseTitle = !this.collapseTitle;
  }
}
