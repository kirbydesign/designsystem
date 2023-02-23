import { Component, ViewChild } from '@angular/core';
import { ModalExperimentalComponent } from '@kirbydesign/designsystem/modal/experimental';
import { KirbyAnimation } from '@kirbydesign/designsystem';

export const fullscreenModalExampleTemplateHTML = `<kirby-modal-experimental
  [open]="open"
  (willDismiss)="close()"
>  
  <div>
    <button kirby-button (click)="scrollToBottom()">
      Scroll to bottom
      <kirby-icon name="arrow-down"></kirby-icon>
    </button>

    <button kirby-button (click)="toggleCanDismiss()">
      Can dismiss: {{ canDismiss }}
    </button>
    <p>
      Lorem ipsum dolor sit amet...
    </p>
  </div>
</kirby-modal-experimental>

<button kirby-button (click)="openModal()">Open Modal</button>
`;

export const fullscreenModalExampleTemplateTS = `openModal() { this.open = true; }`;

export const headerStartSlotExampleTemplate = `<kirby-page-progress header-start>
  <kirby-progress-circle themeColor="warning" value="25" size="sm" class="kirby-text-xsmall">
    1/4
  </kirby-progress-circle>
</kirby-page-progress>
`;

export const footerSlotExampleTemplate = `<kirby-modal-footer-experimental footer>
  <button kirby-button attentionLevel="3">
    To top
    <kirby-icon name="arrow-up"></kirby-icon>
  </button>
  <button kirby-button>Close</button>
</kirby-modal-footer-experimental>
`;
@Component({
  templateUrl: './fullscreen-experimental-example.component.html',
  styleUrls: ['./fullscreen-experimental-example.component.scss'],
})
export class FullscreenModalExperimentalExampleComponent {
  @ViewChild(ModalExperimentalComponent) modal: ModalExperimentalComponent;

  open = false;
  canDismiss = true;
  showFooter = true;
  showPageProgress = true;
  isInlineFooter = false;
  collapseTitle = false;
  scrollDisabled = false;

  openModal() {
    this.open = true;
  }

  closeModal() {
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

  toggleScrollDisabled() {
    this.scrollDisabled = !this.scrollDisabled;
  }
}
