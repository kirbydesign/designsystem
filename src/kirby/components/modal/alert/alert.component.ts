import { NavParams } from '@ionic/angular';

import { Component, ElementRef, ViewChild, AfterViewInit, OnInit, HostBinding } from '@angular/core';

import { AlertConfig } from './config/alert-config';
import { IModalController } from '../services/modal.controller.interface';
import { ModalHelper } from '../services/modal.helper';

@Component({
  selector: 'kirby-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements AfterViewInit, OnInit {
  @ViewChild('alertWrapper') alertWrapper: ElementRef;
  config: AlertConfig;
  scrollY: number = Math.abs(window.scrollY);
  okBtn: string;
  okBtnIsDestructive: boolean;
  cancelBtn: string;
  title: string;
  message: string;
  iconName: string;
  iconThemeColor: string;

  @HostBinding('class.ion-page') private _ionPageReset = false;

  constructor(
    private params: NavParams,
    private modalController: IModalController,
    private modalHelper: ModalHelper
  ) {
    this.config = this.params.get('config');
  }

  ngOnInit(): void {
    this.title = this.config.title;
    this.message = this.config.message;

    if (this.config.icon) {
      this.iconName = this.config.icon.name;
      this.iconThemeColor = this.config.icon.themeColor;
    }

    if (this.config.okBtnText) {
      console.warn('okBtnText will be deprecated on next major version. Please use okBtn instead.');
      this.okBtn = this.config.okBtnText;
    } else if (this.config.okBtn) {
      if (typeof this.config.okBtn === 'string') {
        this.okBtn = this.config.okBtn;
      } else {
        this.okBtn = this.config.okBtn.text;
        this.okBtnIsDestructive = this.config.okBtn.isDestructive;
      }
    }

    if (this.config.cancelBtnText) {
      console.warn(
        'cancelBtnText will be deprecated on next major version. Please use cancelBtn instead.'
      );
      this.cancelBtn = this.config.cancelBtnText;
    } else if (this.config.cancelBtn) {
      this.cancelBtn = this.config.cancelBtn;
    }
  }

  ngAfterViewInit(): void {
    this.modalHelper.blurNativeWrapper(this.alertWrapper.nativeElement);
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
