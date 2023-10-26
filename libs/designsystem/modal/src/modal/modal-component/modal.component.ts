import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { IonContent, IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { KirbyAnimation } from '@kirbydesign/designsystem/helpers';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { KirbyIonicModule } from '@kirbydesign/designsystem/kirby-ionic-module';
import { DrawerSupplementaryAction, ModalSize } from '@kirbydesign/designsystem/modal';

type Flavor = 'modal' | 'drawer';

@Component({
  selector: 'kirby-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [CommonModule, KirbyIonicModule, IconModule, ButtonComponent],
})
export class ModalComponent implements AfterViewInit {
  @ViewChild(IonModal) modal: IonModal;
  @ViewChild(IonModal, { static: true, read: ElementRef })
  modalElement: ElementRef<HTMLElement>;
  @ViewChild(IonContent) ionContent: IonContent;

  _customHeight?: string;

  @Input() collapsibleTitle = false;
  @Input() size: ModalSize = 'medium';
  @Input() set customHeight(customHeight: string) {
    this._customHeight = customHeight;
  }
  @Input() flavor: Flavor = 'modal';
  @Input() canDismiss: boolean | (() => Promise<boolean>) = true;
  @Input() drawerSupplementaryAction?: DrawerSupplementaryAction;
  @Input() open = false;
  @Input() title = '';

  @Output() willPresent = new EventEmitter<CustomEvent<OverlayEventDetail>>();
  @Output() didPresent = new EventEmitter<CustomEvent<OverlayEventDetail>>();
  @Output() didDismiss = new EventEmitter<CustomEvent<OverlayEventDetail>>();
  @Output() willDismiss = new EventEmitter<CustomEvent<OverlayEventDetail>>();

  ngAfterViewInit(): void {
    if (this._customHeight) {
      this.modalElement.nativeElement.style.setProperty('--kirby-modal-height', this._customHeight);
    }
  }

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
