import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IonContent, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { KirbyAnimation } from '../../../animation/kirby-animation';

@Component({
  selector: 'kirby-fullscreen-modal-experimental',
  templateUrl: './fullscreen.component.html',
  styleUrls: ['./fullscreen.component.scss'],
})
export class FullscreenModalExperimentalComponent {
  @ViewChild(IonModal) modal: IonModal;
  @ViewChild(IonContent) ionContent: IonContent;

  @Input() open = false;
  @Input() canDismiss = true;
  @Input() title = '';
  @Input() hasCollapsibleTitle = false;
  @Input() scrollDisabled = false;

  @Output() willPresent = new EventEmitter<OverlayEventDetail>();
  @Output() didPresent = new EventEmitter<OverlayEventDetail>();
  @Output() didDismiss = new EventEmitter<OverlayEventDetail>();
  @Output() willDismiss = new EventEmitter<OverlayEventDetail>();

  _closeModal() {
    this.modal.dismiss(null, 'cancel');
  }

  _onWillPresent(event: OverlayEventDetail) {
    this.willPresent.emit(event);
  }

  _onDidPresent(event: OverlayEventDetail) {
    this.didPresent.emit(event);
  }

  _onWillDismiss(event: OverlayEventDetail) {
    this.willDismiss.emit(event);
  }

  _onDidDismiss(event: OverlayEventDetail) {
    this.didDismiss.emit(event);
  }

  public scrollToTop(scrollDuration?: KirbyAnimation.Duration) {
    this.ionContent.scrollToTop(scrollDuration || 0);
  }

  public scrollToBottom(scrollDuration?: KirbyAnimation.Duration) {
    this.ionContent.scrollToBottom(scrollDuration || 0);
  }
}
