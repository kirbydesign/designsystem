import { Component, OnInit } from '@angular/core';
import { ModalConfig, ModalController } from '@kirbydesign/designsystem';
import { TransferAndPayModalComponent } from '../transfer-and-pay-modal/transfer-and-pay-modal.component';

@Component({
  selector: 'flows-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private modalController: ModalController) {}

  showModal() {
    const config: ModalConfig = {
      flavor: 'modal',
      component: TransferAndPayModalComponent,
      componentProps: {
        prop1: 'value1',
        prop2: 'value2',
      },
    };
    this.modalController.showModal(config);
  }

  ngOnInit(): void {}
}
