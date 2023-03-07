import { Component, ViewChild } from '@angular/core';
import { ModalExperimentalComponent } from '@kirbydesign/designsystem/modal/experimental';
import { KirbyAnimation } from '@kirbydesign/designsystem';
import { PlatformService } from '@kirbydesign/designsystem';

export const nestedModalsExampleTemplateHTML = `<kirby-modal-experimental
  [open]="open"
  (willDismiss)="close()"
>  
  <button kirby-button (click)="openNestedModal = true">Open nested modal</button>
  <button kirby-button (click)="openNestedDrawer = true">Open nested drawer</button>

    <p>
      Lorem ipsum dolor sit amet...
    </p>

    <kirby-modal-experimental
      [open]="openNestedModal"
      [title]="'Nested Modal'"
      (willDismiss)="openNestedModal = false"
    >
      <p>
        Lorem ipsum...
      </p>
    </kirby-modal-experimental>

    <kirby-modal-experimental
    [flavor]="nestedDrawerFlavor"
    [open]="openNestedDrawer"
    [title]="'Nested Drawer'"
    [breakpoints]="nestedDrawerBreakpoints"
    [initialBreakpoint]="nestedDrawerInitialBreakpoint"
    (willDismiss)="openNestedDrawer = false"
  >
    <p>
      Lorem ipsum...
    </p>
  </kirby-modal-experimental>
</kirby-modal-experimental>

<button kirby-button (click)="openModal()">Open Modal</button>
`;

export const nestedModalsExampleTemplateTS = `import { PlatformService } from '@kirbydesign/designsystem';

@Component({
  ...
}) export class MyComponent {
  constructor(private platformService: PlatformService) {}

  nestedDrawerFlavor = this.platformService.isPhabletOrBigger() ? 'modal' : 'drawer';
}
`;

@Component({
  templateUrl: './nested-modals-experimental-example.component.html',
  styleUrls: ['./nested-modals-experimental-example.component.scss'],
})
export class NestedModalsExperimentalExampleComponent {
  constructor(private platformService: PlatformService) {}

  @ViewChild(ModalExperimentalComponent) modal: ModalExperimentalComponent;

  open = false;
  showFooter = true;
  showPageProgress = true;
  isInlineFooter = false;
  collapseTitle = false;
  scrollDisabled = false;

  openNestedModal = false;
  openNestedDrawer = false;
  nestedDrawerBreakpoints = [0, 0.5];
  nestedDrawerInitialBreakpoint = 0.5;
  nestedDrawerFlavor = this.platformService.isPhabletOrBigger() ? 'modal' : 'drawer';

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
