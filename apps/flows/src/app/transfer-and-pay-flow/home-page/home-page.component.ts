import { Component } from '@angular/core';
import { ModalController } from '@kirbydesign/designsystem';
import { ModalConfig } from '@kirbydesign/designsystem/modal';
import { TransferAndPayModalComponent } from '../transfer-and-pay-modal/transfer-and-pay-modal.component';

@Component({
  selector: 'flows-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  constructor(private modalController: ModalController) {}

  showModal() {
    const config: ModalConfig = {
      flavor: 'modal',
      component: TransferAndPayModalComponent,
    };
    this.modalController.showModal(config);
  }
}
