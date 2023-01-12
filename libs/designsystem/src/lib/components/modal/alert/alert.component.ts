import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { WindowRef } from '@kirbydesign/designsystem/types';
import { Observable, of } from 'rxjs';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { ThemeColorDirective } from '../../../directives';
import { ButtonComponent } from '../../button/button.component';
import { EmptyStateModule } from '../../empty-state/empty-state.module';

@Component({
  standalone: true,
  imports: [
    IconModule,
    EmptyStateModule,
    ButtonComponent,
    CommonModule,
    EmptyStateModule,
    ThemeColorDirective,
  ],
  selector: 'kirby-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { '[class.ion-page]': 'false' }, //Ensure ion-page class doesn't get applied by Ionic Modal Controller
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent implements AfterViewInit {
  readonly BLUR_WRAPPER_DELAY_IN_MS = 50;
  @ViewChild('alertWrapper', { static: true }) private alertWrapper: ElementRef;
  private scrollY: number = Math.abs(this.windowRef.nativeWindow.scrollY);

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
  @Input() okBtn: string;
  @Input() okBtnIsDestructive: boolean;
  @Input() cancelBtn: string;

  constructor(private elementRef: ElementRef<HTMLElement>, private windowRef: WindowRef) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.alertWrapper.nativeElement.focus();
      this.alertWrapper.nativeElement.blur();
    }, this.BLUR_WRAPPER_DELAY_IN_MS);
  }

  onFocusChange() {
    // This fixes an undesired scroll behaviour occurring on keyboard-tabbing
    this.windowRef.nativeWindow.scrollTo({ top: this.scrollY });
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
