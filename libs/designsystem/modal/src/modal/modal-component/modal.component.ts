import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { IonContent, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { KirbyAnimation } from '@kirbydesign/designsystem/helpers';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { KirbyIonicModule } from '@kirbydesign/designsystem/kirby-ionic-module';
import { first, fromEvent, takeUntil } from 'rxjs';
import { WindowRef } from '@kirbydesign/designsystem/types';
import {
  DrawerSupplementaryAction,
  ModalCompactWrapperComponent,
  ModalConfig,
  ModalFlavor,
  ModalSize,
  ModalWrapperComponent,
  ShowAlertCallback,
} from '../../modal-wrapper';
import { CanDismissHelper } from '../services';

@Component({
  standalone: true,
  selector: 'kirby-modal',
  templateUrl: './modal.component.html',
  imports: [
    CommonModule,
    KirbyIonicModule,
    IconModule,
    ButtonComponent,
    ModalWrapperComponent,
    ModalCompactWrapperComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent implements OnChanges, AfterContentInit {
  @ViewChild(IonModal, { static: true, read: ElementRef })
  modalElement: ElementRef<HTMLIonModalElement>;
  @ViewChild(IonContent) ionContent: IonContent;
  @ContentChild(TemplateRef, { static: true }) template: TemplateRef<unknown>;

  @Input() isOpen = false;
  @Input() trigger: string;
  @Input() size: ModalSize = 'medium';
  @Input() scrollDisabled = false;
  @Input() set canDismiss(canDismiss: ShowAlertCallback | boolean) {
    typeof canDismiss === 'boolean'
      ? (this._canDismiss = canDismiss)
      : (this._canDismiss = this.canDismissHelper.getCanDismissCallback(canDismiss));
  }

  // NOTE: input properties forwarded to modal-wrapper ModalConfig
  @Input() collapseTitle = false;
  @Input() customHeight: string = undefined;
  @Input() flavor: ModalFlavor = 'modal';
  @Input() drawerSupplementaryAction?: DrawerSupplementaryAction = undefined;
  @Input() interactWithBackground: boolean = false;
  // end NOTE

  @Output() willPresent = new EventEmitter<CustomEvent<OverlayEventDetail>>();
  @Output() didPresent = new EventEmitter<CustomEvent<OverlayEventDetail>>();
  @Output() didDismiss = new EventEmitter<CustomEvent<OverlayEventDetail>>();
  @Output() willDismiss = new EventEmitter<CustomEvent<OverlayEventDetail>>();

  /**
   * We populate the ModalConfig with defaults here. This ensures that we can
   * guard for `if (key in this._config)` and only update the config when any of these
   * inputs change.
   */
  _config: ModalConfig = {
    collapseTitle: this.collapseTitle,
    customHeight: this.customHeight,
    flavor: this.flavor,
    drawerSupplementaryAction: this.drawerSupplementaryAction,
    interactWithBackground: this.interactWithBackground,
  };

  _canDismiss: ShowAlertCallback | boolean = true;

  constructor(private canDismissHelper: CanDismissHelper, private windowRef: WindowRef) {}

  ngAfterContentInit(): void {
    this.handleBrowserBackButton(this.modalElement.nativeElement);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateModalConfigOnChange(changes);
  }

  public scrollToTop(scrollDuration?: KirbyAnimation.Duration) {
    this.ionContent.scrollToTop(scrollDuration);
  }

  public scrollToBottom(scrollDuration?: KirbyAnimation.Duration) {
    this.ionContent.scrollToBottom(scrollDuration);
  }

  public _onWillPresent(event: CustomEvent<OverlayEventDetail>) {
    this.willPresent.emit(event);

    if (this.interactWithBackground) {
      this.windowRef.nativeWindow.document.body.classList.add('allow-background-scroll');
    }
  }

  public _onDidPresent(event: CustomEvent<OverlayEventDetail>) {
    this.didPresent.emit(event);
  }

  public _onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (this.interactWithBackground) {
      this.windowRef.nativeWindow.document.body.classList.remove('allow-background-scroll');
    }

    this.willDismiss.emit(event);
  }

  public _onDidDismiss(event: CustomEvent<OverlayEventDetail>) {
    this.didDismiss.emit(event);
  }

  private handleBrowserBackButton(modal: HTMLIonModalElement) {
    const popStateEvent$ = fromEvent(this.windowRef.nativeWindow, 'popstate').pipe(first());
    const modalClose$ = fromEvent(modal, 'ionModalDidDismiss');

    popStateEvent$.pipe(takeUntil(modalClose$)).subscribe(() => {
      modal.dismiss();
    });
  }

  private updateModalConfigOnChange(changes: SimpleChanges) {
    Object.entries(changes).forEach(([key]) => {
      const isModalConfigProperty = key in this._config;
      if (isModalConfigProperty) {
        this._config[key] = changes[key].currentValue;
      }
    });
  }
}
