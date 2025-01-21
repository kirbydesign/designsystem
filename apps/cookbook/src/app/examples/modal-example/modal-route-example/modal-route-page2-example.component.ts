import { Component, Optional, SkipSelf } from '@angular/core';

import { Modal, ModalController } from '@kirbydesign/designsystem';
import { PageModule } from '@kirbydesign/designsystem/page';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { NgIf } from '@angular/common';
import { ModalFooterComponent } from '@kirbydesign/designsystem/modal';
import { IconModule } from '@kirbydesign/designsystem/icon';

@Component({
  selector: 'cookbook-modal-route-page-2-example',
  template: `
    <kirby-page-title>Modal Page 2/2</kirby-page-title>
    <h4>Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</h4>
    <p>
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
      laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
      beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
      odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
      Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
      sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
      voluptatem."
    </p>
    <button kirby-button (click)="toggleFooter()">Toggle footer</button>
    <kirby-modal-footer *ngIf="showFooter">
      <button kirby-button attentionLevel="3" (click)="navigateToPreviousModal()" aria-label="Back">
        <kirby-icon name="arrow-back"></kirby-icon>
      </button>
      <button kirby-button (click)="close()">Finish</button>
    </kirby-modal-footer>
  `,
  styles: [
    'h4 { margin-top: 24px; } ',
    'kirby-modal-footer { --kirby-modal-footer-justify-content: space-between; }',
  ],
  imports: [PageModule, ButtonComponent, NgIf, ModalFooterComponent, IconModule],
})
export class ModalRoutePage2ExampleComponent {
  constructor(
    private modalController: ModalController,
    @Optional() @SkipSelf() private modal: Modal
  ) {}

  showFooter: boolean = true;

  toggleFooter() {
    this.showFooter = !this.showFooter;
  }

  navigateToPreviousModal() {
    this.modalController.navigateWithinModal('../page1');
  }

  close() {
    const someTestData: number = Math.PI;
    this.modal.close(someTestData);
  }
}
