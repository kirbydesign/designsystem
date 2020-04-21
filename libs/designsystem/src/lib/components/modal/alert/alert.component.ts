import { Component, ElementRef, ViewChild, AfterViewInit, HostBinding, Input } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'kirby-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements AfterViewInit {
  @ViewChild('alertWrapper', { static: true }) private alertWrapper: ElementRef;
  private scrollY: number = Math.abs(window.scrollY);

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

  private _ionPageReset = false;
  @HostBinding('class.ion-page')
  get ionPageReset() {
    return this._ionPageReset;
  }

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.alertWrapper.nativeElement.focus();
      this.alertWrapper.nativeElement.blur();
    }, 50);
  }

  onFocusChange() {
    // This fixes an undesired scroll behaviour occurring on keyboard-tabbing
    window.scrollTo({ top: this.scrollY });
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
