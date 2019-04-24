import { Component } from '@angular/core';
import { NavParams } from '@ionic/angular';

import { ModalConfig } from './config/modal-config';
import { ModalConfigHelper } from './config/modal-config.helper';
import { IModalController } from './services/modal.controller.interface';

@Component({
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  config: ModalConfig;

  constructor(private params: NavParams, private modalController: IModalController) {
    this.config = ModalConfigHelper.processOptionalValues(this.params.get('config'));
  }

  dismissModal(): void {
    this.modalController.hideModal();
  }
}
