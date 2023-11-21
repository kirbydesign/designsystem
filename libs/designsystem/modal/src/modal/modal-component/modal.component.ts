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
  ModalConfig,
  ModalSize,
  ModalWrapperComponent,
} from '../../modal-wrapper';

type Flavor = 'modal' | 'drawer';

@Component({
  standalone: true,
  selector: 'kirby-modal',
  templateUrl: './modal.component.html',
  imports: [CommonModule, KirbyIonicModule, IconModule, ButtonComponent, ModalWrapperComponent],
})
export class ModalComponent {
  @ViewChild(IonModal) modal: IonModal;
  @ViewChild(IonModal, { static: true, read: ElementRef })
  modalElement: ElementRef<HTMLElement>;
  @ViewChild(IonContent) ionContent: IonContent;

  _customHeight?: string;

  @ContentChild(TemplateRef, { static: true }) template: TemplateRef<any>;

  @Input() config: ModalConfig;
  @Input() collapseTitle = false;
  @Input() size: ModalSize = 'medium';
  @Input() flavor: Flavor = 'modal';
  @Input() canDismiss: boolean | (() => Promise<boolean>) = true;
  @Input() drawerSupplementaryAction?: DrawerSupplementaryAction;
  @Input() open = false;
  @Input() title = '';
  @Input() scrollDisabled = false;

  @Output() willPresent = new EventEmitter<CustomEvent<OverlayEventDetail>>();
  @Output() didPresent = new EventEmitter<CustomEvent<OverlayEventDetail>>();
  @Output() didDismiss = new EventEmitter<CustomEvent<OverlayEventDetail>>();
  @Output() willDismiss = new EventEmitter<CustomEvent<OverlayEventDetail>>();

  _closeModal() {
    this.modal.dismiss(null, 'cancel');
  }

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
    this.didDismiss.emit(event);
  }

  public scrollToTop(scrollDuration?: KirbyAnimation.Duration) {
    this.ionContent.scrollToTop(scrollDuration);
  }

  public scrollToBottom(scrollDuration?: KirbyAnimation.Duration) {
    this.ionContent.scrollToBottom(scrollDuration);
  }
}
