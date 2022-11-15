import { Component, Input, OnInit } from '@angular/core';
import { ModalConfig, ModalController } from '@kirbydesign/designsystem';
import { DetailsComponent } from '../details/details.component';
import { Detail } from '../detail.model';

@Component({
  selector: 'flows-transfer-registered',
  templateUrl: './transfer-registered.component.html',
  styleUrls: ['./transfer-registered.component.scss'],
})
export class TransferRegisteredComponent {
  @Input() verifiedDetails: Detail;

  constructor(private modalController: ModalController) {}

  showModalDetails(verifiedDetails: Detail) {
    const config: ModalConfig = {
      flavor: 'drawer',
      component: DetailsComponent,
      componentProps: verifiedDetails,
    };
    this.modalController.showModal(config);
  }
}
