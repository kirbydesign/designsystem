import { Component, ElementRef, ViewChild, AfterViewInit, HostBinding, Input } from '@angular/core';

import { IModalController } from '../services/modal.controller.interface';

@Component({
  selector: 'kirby-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements AfterViewInit {
  @ViewChild('alertWrapper', { static: true }) private alertWrapper: ElementRef;
  private scrollY: number = Math.abs(window.scrollY);

  @Input() title: string;
  @Input() message: string;
  @Input() iconName: string;
  @Input() iconThemeColor: string;
  @Input() okBtnText: string;
  @Input() okBtnIsDestructive: boolean;
  @Input() cancelBtnText: string;

  @HostBinding('class.ion-page') private _ionPageReset = false;

  constructor(private modalController: IModalController) {}

  ngAfterViewInit(): void {
    this.modalController.blurNativeWrapper(this.alertWrapper.nativeElement);
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
