import { NavParams } from '@ionic/angular';

import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';

import { AlertConfig } from '../modal/alert/config/alert-config';
import { IModalController } from '../modal/services/modal.controller.interface';
import { ModalHelper } from '@kirbydesign/designsystem/helpers/modal-helper';

@Component({
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements AfterViewInit, OnInit {
  @ViewChild('alertWrapper') alertWrapper: ElementRef;
  config: AlertConfig;
  scrollY: number = Math.abs(window.scrollY);
  okBtnText: string;
  okBtnIsDestructive: boolean;
  cancelBtnText: string;
  title: string;
  message: string;
  iconName: string;
  iconThemeColor: string;

  constructor(private params: NavParams, private modalController: IModalController) {
    this.config = this.params.get('config');
  }

  ngOnInit(): void {
    this.title = this.config.title;
    this.message = this.config.message;

    if (this.config.icon) {
      this.iconName = this.config.icon.iconName;
      this.iconThemeColor = this.config.icon.themeColor;
    }

    if (this.config.okBtnText) {
      console.warn('okBtnText will be deprecated on next major version. Please use okBtn instead.');
      this.okBtnText = this.config.okBtnText;
    } else if (this.config.okBtn) {
      this.okBtnText = this.config.okBtn.text;
      this.okBtnIsDestructive = this.config.okBtn.isDestructive;
    }

    this.cancelBtnText = this.config.cancelBtnText;
  }

  ngAfterViewInit(): void {
    ModalHelper.blurNativeWrapper(this.alertWrapper.nativeElement);
  }

  onFocusChange() {
    // This fixes an undesired scroll behaviour occurring on keyboard-tabbing
    window.scrollTo({ top: this.scrollY });
  }

  onCancel() {
    this.modalController.hideTopmost(false);
  }

  onOk() {
    this.modalController.hideTopmost(true);
  }
}
