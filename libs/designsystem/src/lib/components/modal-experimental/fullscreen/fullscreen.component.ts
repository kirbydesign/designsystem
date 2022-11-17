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
  @Input() hasCollapsibleTitle = true;

  //TODO - replace any
  @Output() willPresent = new EventEmitter<any>();
  @Output() didPresent = new EventEmitter<any>();
  @Output() didDismiss = new EventEmitter<any>();
  @Output() willDismiss = new EventEmitter<any>();

  closeModal() {
    this.modal.dismiss(null, 'cancel');
  }

  onWillPresent(event) {
    this.willPresent.emit(event);
  }

  onDidPresent(event) {
    this.didPresent.emit(event);
  }

  onWillDismiss(event) {
    this.willDismiss.emit(event);
  }

  onDidDismiss(event) {
    this.didDismiss.emit(event);
  }
}
