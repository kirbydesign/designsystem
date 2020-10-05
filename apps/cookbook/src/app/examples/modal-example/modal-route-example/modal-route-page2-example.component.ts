import { Component, Optional, SkipSelf } from '@angular/core';

import { Modal, ModalController } from '@kirbydesign/designsystem';

@Component({
  template: `
    <button kirby-button attentionLevel="3" (click)="navigateToPreviousModal()">
      <kirby-icon name="arrow-back"></kirby-icon>
      Page 1
    </button>
    <h4>Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</h4>
    <p>
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
      laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
      beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
      odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
      Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
      sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
      voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit
      laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit
      qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum
      fugiat quo voluptas nulla pariatur?" 1914 translation by H. Rackham "
    </p>
    <button kirby-button (click)="close()">Hide me</button>
  `,
  styles: ['h4 { margin-top: 24px; } '],
})
export class ModalRoutePage2ExampleComponent {
  constructor(
    private modalController: ModalController,
    @Optional() @SkipSelf() private modal: Modal
  ) {}

  navigateToPreviousModal() {
    this.modalController.navigateWithinModal('../page1');
  }

  close() {
    let someTestData: number = Math.PI;
    this.modal.close(someTestData);
  }
}
