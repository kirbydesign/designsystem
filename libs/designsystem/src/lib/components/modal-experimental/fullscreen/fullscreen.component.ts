import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'kirby-fullscreen-modal-experimental',
  templateUrl: './fullscreen.component.html',
  styleUrls: ['./fullscreen.component.scss'],
})
export class FullscreenModalExperimentalComponent {
  @ViewChild(IonModal) modal: IonModal;

  @Input() open = false;
  @Input() canDismiss = true;
  @Input() hasCollapsibleTitle = true;

  //TODO - replace any
  @Output() willPresent = new EventEmitter<any>();
  @Output() didPresent = new EventEmitter<any>();
  @Output() didDismiss = new EventEmitter<any>();
  @Output() willDismiss = new EventEmitter<any>();

  _closeModal() {
    this.modal.dismiss(null, 'cancel');
  }

  _onWillPresent(event) {
    this.willPresent.emit(event);
  }

  _onDidPresent(event) {
    this.didPresent.emit(event);
  }

  _onWillDismiss(event) {
    this.willDismiss.emit(event);
  }

  _onDidDismiss(event) {
    this.didDismiss.emit(event);
  }
}
