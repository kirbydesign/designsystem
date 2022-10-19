import { Component, OnInit } from '@angular/core';
import { ModalConfig, ModalController } from '@kirbydesign/designsystem';
import { ChooseRecieverComponent } from '../choose-reciever/choose-reciever.component';
@Component({
  selector: 'flows-transfer-and-pay-modal',
  templateUrl: './transfer-and-pay-modal.component.html',
  styleUrls: ['./transfer-and-pay-modal.component.scss'],
})
export class TransferAndPayModalComponent implements OnInit {
  constructor(private modalController: ModalController) {}

  showModalChoose() {
    const config: ModalConfig = {
      flavor: 'drawer',
      component: ChooseRecieverComponent,
      componentProps: {
        prop1: 'value1',
        prop2: 'value2',
      },
    };
    this.modalController.showModal(config);
  }

  ngOnInit(): void {}
}
