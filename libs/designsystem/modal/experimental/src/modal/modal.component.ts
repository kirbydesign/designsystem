import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IonContent, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { KirbyAnimation } from '@kirbydesign/designsystem/helpers';

@Component({
  selector: 'kirby-modal-experimental',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalExperimentalComponent {
  @ViewChild(IonModal) modal: IonModal;
  @ViewChild(IonContent) ionContent: IonContent;

  @Input() open = false;
  @Input() canDismiss: boolean | (() => Promise<boolean>) = true;
  @Input() title = '';
  @Input() hasCollapsibleTitle = false;
  @Input() scrollDisabled = false;
  @Input() width: 'small' | 'medium' | 'large' = 'medium';
  @Input() height: string;

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
    this.ionContent.scrollToTop(scrollDuration || 0);
  }

  public scrollToBottom(scrollDuration?: KirbyAnimation.Duration) {
    this.ionContent.scrollToBottom(scrollDuration || 0);
  }
}
