import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { IonContent, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { KirbyAnimation } from '@kirbydesign/designsystem/helpers';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { KirbyIonicModule } from '@kirbydesign/designsystem/kirby-ionic-module';
import {
  DrawerSupplementaryAction,
  ModalCompactWrapperComponent,
  ModalConfig,
  ModalFlavor,
  ModalSize,
  ModalWrapperComponent,
  ShowAlertCallback,
} from '../../modal-wrapper';

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
})
export class ModalComponent {
  @ViewChild(IonModal) modal: IonModal;
  @ViewChild(IonModal, { static: true, read: ElementRef })
  modalElement: ElementRef<HTMLElement>;
  @ViewChild(IonContent) ionContent: IonContent;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @ContentChild(TemplateRef, { static: true }) template: TemplateRef<any>;

  /*
   * Modal Component-specific input properties
   */

  @Input() open = false;
  @Input() trigger: string;

  /*
   * ModalConfig input properties
   */

  @Input() collapseTitle = true;
  @Input() size: ModalSize = 'medium';
  @Input() customHeight: string;
  @Input() flavor: ModalFlavor = 'modal';
  @Input() canDismiss: ShowAlertCallback = () => true;
  @Input() drawerSupplementaryAction?: DrawerSupplementaryAction;
  @Input() title = '';
  @Input() scrollDisabled = false;
  @Input() interactWithBackground: boolean;

  @Output() willPresent = new EventEmitter<CustomEvent<OverlayEventDetail>>();
  @Output() didPresent = new EventEmitter<CustomEvent<OverlayEventDetail>>();
  @Output() didDismiss = new EventEmitter<CustomEvent<OverlayEventDetail>>();
  @Output() willDismiss = new EventEmitter<CustomEvent<OverlayEventDetail>>();

  _config: ModalConfig = {
    size: this.size,
    flavor: this.flavor,
  };

  _onWillPresent(event: CustomEvent<OverlayEventDetail>) {
    this.willPresent.emit(event);
  }

  _onDidPresent(event: CustomEvent<OverlayEventDetail>) {
    this.didPresent.emit(event);
  }

  _onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    this.willDismiss.emit(event);
  }

  _onDidDismiss(event: CustomEvent<OverlayEventDetail>) {
    this.open = false;
    this.didDismiss.emit(event);
  }

  public scrollToTop(scrollDuration?: KirbyAnimation.Duration) {
    this.ionContent.scrollToTop(scrollDuration);
  }

  public scrollToBottom(scrollDuration?: KirbyAnimation.Duration) {
    this.ionContent.scrollToBottom(scrollDuration);
  }
}
