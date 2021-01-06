import { Component, Optional, SkipSelf } from '@angular/core';

import { Modal, ModalController } from '@kirbydesign/designsystem';

@Component({
  selector: 'cookbook-modal-route-page-3-example',
  template: `
    <kirby-page-title>Modal Page 3/3</kirby-page-title>
    <h4>Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</h4>
    <p>
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
      laudantium "
    </p>
    <button kirby-button (click)="toggleFooter()">Toggle footer</button>
    <kirby-inline-footer>Inline Footer</kirby-inline-footer>
    <kirby-modal-footer *ngIf="showFooter">
      <button kirby-button attentionLevel="3" (click)="navigateToPreviousModal()">
        <kirby-icon name="arrow-back"></kirby-icon>
      </button>
      <button kirby-button (click)="close()">Finish</button>
    </kirby-modal-footer>
  `,
  styles: [
    'h4 { margin-top: 24px; } ',
    'kirby-modal-footer { --kirby-modal-footer-justify-content: space-between; }',
  ],
})
export class ModalRoutePage3ExampleComponent {
  constructor(
    private modalController: ModalController,
    @Optional() @SkipSelf() private modal: Modal
  ) {}

  showFooter: boolean = true;

  toggleFooter() {
    this.showFooter = !this.showFooter;
  }

  navigateToPreviousModal() {
    this.modalController.navigateWithinModal('../page2');
  }

  close() {
    let someTestData: number = Math.PI;
    this.modal.close(someTestData);
  }
}
