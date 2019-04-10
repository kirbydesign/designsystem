import { Component } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

import { ModalConfig } from './config/modal-config';
import { ModalConfigHelper } from './helpers/modal-config-helper';

@Component({
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  config: ModalConfig;

  constructor(private modalController: ModalController, params: NavParams) {
    this.config = ModalConfigHelper.processOptionalValues(params.get('config'));
  }

  // TODO: better to call the modal-service somehow, circular dependency prevents this atm
  dismissModal(): void {
    this.modalController.dismiss();
  }
}
