import { Component, ElementRef, ViewChild, AfterViewInit, HostBinding, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { IModalController } from '../services/modal.controller.interface';

@Component({
  selector: 'kirby-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements AfterViewInit {
  @ViewChild('alertWrapper', { static: true }) private alertWrapper: ElementRef;
  private scrollY: number = Math.abs(window.scrollY);

  private _title: string & Observable<string>;
  titleIsString: boolean;
  public get title(): string & Observable<string> {
    return this._title;
  }
  @Input()
  public set title(v: string & Observable<string>) {
    this._title = v;
    this.titleIsString = typeof v === 'string';
  }

  private _message: string & Observable<string>;
  messageIsString: boolean;
  public get message(): string & Observable<string> {
    return this._message;
  }

  @Input()
  public set message(v: string & Observable<string>) {
    this._message = v;
    this.messageIsString = typeof v === 'string';
  }

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
