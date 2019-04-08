import { Component } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

import { ModalConfig } from './modal-config';

@Component({
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  config: ModalConfig;

  constructor(private modalController: ModalController, params: NavParams) {
    this.config = params.get('config');

    if (!this.config.titleHorizontalAlignment) {
      this.config.titleHorizontalAlignment = 'left';
    }
  }

  closeModal(): void {
    this.modalController.dismiss('any response goes here...');
  }
}
