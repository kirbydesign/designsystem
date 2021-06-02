import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';

import { WindowRef } from '../../../types/window-ref';

@Component({
  selector: 'kirby-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  // tslint:disable-next-line: no-host-metadata-property
  host: { '[class.ion-page]': 'false' }, //Ensure ion-page class doesn't get applied by Ionic Modal Controller
})
export class AlertComponent implements AfterViewInit {
  readonly BLUR_WRAPPER_DELAY_IN_MS = 50;
  @ViewChild('alertWrapper', { static: true }) private alertWrapper: ElementRef;
  private scrollY: number = Math.abs(this.window.scrollY);

  title$: Observable<string>;
  @Input()
  set title(title: string | Observable<string>) {
    this.title$ = typeof title === 'string' ? of(title) : title;
  }

  message$: Observable<string>;
  @Input()
  set message(message: string & Observable<string>) {
    this.message$ = typeof message === 'string' ? of(message) : message;
  }

  @Input() iconName: string;
  @Input() iconThemeColor: string;
  @Input() okBtnText: string;
  @Input() okBtnIsDestructive: boolean;
  @Input() cancelBtnText: string;

  constructor(private elementRef: ElementRef<HTMLElement>, private window: WindowRef) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.alertWrapper.nativeElement.focus();
      this.alertWrapper.nativeElement.blur();
    }, this.BLUR_WRAPPER_DELAY_IN_MS);
  }

  onFocusChange() {
    // This fixes an undesired scroll behaviour occurring on keyboard-tabbing
    this.window.scrollTo({ top: this.scrollY });
  }

  onCancel() {
    const ionModalElement = this.elementRef.nativeElement.closest('ion-modal');
    ionModalElement && ionModalElement.dismiss(false);
  }

  onOk() {
    const ionModalElement = this.elementRef.nativeElement.closest('ion-modal');
    ionModalElement && ionModalElement.dismiss(true);
  }
}
