import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

import { ModalConfig } from './config/modal-config';
import { ModalConfigHelper } from './config/modal-config.helper';
import { IModalController } from './services/modal.controller.interface';

@Component({
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements AfterViewInit {
  @ViewChild('modalCloseButtonWrapper') modalCloseButtonWrapper: ElementRef;
  config: ModalConfig;

  constructor(private params: NavParams, private modalController: IModalController) {
    this.config = ModalConfigHelper.processOptionalValues(this.params.get('config'));
  }

  ngAfterViewInit(): void {
    const el = this.modalCloseButtonWrapper.nativeElement;
    setTimeout(() => {
      el.focus();
      el.blur();
    }, 50);
  }

  dismissModal(): void {
    this.modalController.hideModal();
  }

  keyupModal(e: any) {
    e.preventDefault();
    if (e.keyCode === 32 || e.keyCode === 13) {
      this.dismissModal();
    }
  }
}
