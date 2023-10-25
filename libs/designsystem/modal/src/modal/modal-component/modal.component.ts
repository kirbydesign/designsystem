import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IonContent, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { KirbyAnimation } from '@kirbydesign/designsystem/helpers';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { KirbyIonicModule } from '@kirbydesign/designsystem/kirby-ionic-module';
import { ModalSize } from '@kirbydesign/designsystem/modal';

type Flavor = 'modal' | 'drawer';

@Component({
  selector: 'kirby-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [CommonModule, KirbyIonicModule, IconModule, ButtonComponent],
})
export class ModalComponent {
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
  @Input() size: ModalSize = 'medium';
  @Input() set customHeight(userDefinedHeight: string) {
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
    this.ionContent.scrollToTop(scrollDuration);
  }

  public scrollToBottom(scrollDuration?: KirbyAnimation.Duration) {
    this.ionContent.scrollToBottom(scrollDuration);
  }
}
