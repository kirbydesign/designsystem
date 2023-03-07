import { Component, ViewChild } from '@angular/core';
import { ModalV2Component } from '@kirbydesign/designsystem/modal/v2';
import { KirbyAnimation } from '@kirbydesign/designsystem';

export const fullscreenModalExampleTemplateHTML = `<kirby-modal-v2
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
</kirby-modal-v2>

<button kirby-button (click)="openModal()">Open Modal</button>
`;

export const fullscreenModalExampleTemplateTS = `openModal() { this.open = true; }`;

export const headerStartSlotExampleTemplate = `<kirby-page-progress header-start>
  <kirby-progress-circle themeColor="warning" value="25" size="sm" class="kirby-text-xsmall">
    1/4
  </kirby-progress-circle>
</kirby-page-progress>
`;

export const footerSlotExampleTemplate = `<kirby-modal-v2-footer footer>
  <button kirby-button attentionLevel="3">
    To top
    <kirby-icon name="arrow-up"></kirby-icon>
  </button>
  <button kirby-button>Close</button>
</kirby-modal-v2-footer>
`;
@Component({
  templateUrl: './fullscreen-v2-example.component.html',
  styleUrls: ['./fullscreen-v2-example.component.scss'],
})
export class FullscreenModalV2ExampleComponent {
  @ViewChild(ModalV2Component) modal: ModalV2Component;

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
