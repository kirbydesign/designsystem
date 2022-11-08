import { Component, Input, OnInit } from '@angular/core';
import { ModalConfig, ModalController } from '@kirbydesign/designsystem';
import { DetailsComponent } from '../details/details.component';
import { Details } from '../details.model';

@Component({
  selector: 'flows-transfer-registered',
  templateUrl: './transfer-registered.component.html',
  styleUrls: ['./transfer-registered.component.scss'],
})
export class TransferRegisteredComponent implements OnInit {
  @Input() verifiedDetails: Details;

  constructor(private modalController: ModalController) {}

  ngOnInit(): void {}

  showModalDetails(verified: boolean, verifiedDetails: Details) {
    const config: ModalConfig = {
      flavor: 'drawer',
      component: DetailsComponent,
      componentProps: {
        prop1: verified,
        verifiedDetails: verifiedDetails,
      },
    };
    this.modalController.showModal(config);
  }
}
