import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IonContent, IonModal } from '@ionic/angular/standalone';
import { OverlayEventDetail } from '@ionic/core/components';
import { KirbyAnimation } from '@kirbydesign/designsystem/helpers';

type Flavor = 'modal' | 'drawer';
type SizeTemp = 'md';

@Component({
  selector: 'kirby-modal-v2',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalV2Component {
  @ViewChild(IonModal) modal: IonModal;
  @ViewChild(IonModal, { static: true, read: ElementRef })
  modalElement: ElementRef<HTMLElement>;
  @ViewChild(IonContent) ionContent: IonContent;

  @Input() flavor: Flavor = 'modal';
  @Input() open = false;
  @Input() canDismiss: boolean | (() => Promise<boolean>) = true;
  @Input() title = '';
  @Input() hasCollapsibleTitle = false;
  @Input() scrollDisabled = false;
  @Input() breakpoints: number[];
  @Input() initialBreakpoint;
  @Input() size: SizeTemp = 'md';
  @Input() set height(userDefinedHeight: string) {
    // If the user has defined a height, then we override the --height
    // specified by the 'size' classes in /core/src/scss/_global-styles.scss
    this.modalElement.nativeElement.style.setProperty('--height', userDefinedHeight);
  }

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
