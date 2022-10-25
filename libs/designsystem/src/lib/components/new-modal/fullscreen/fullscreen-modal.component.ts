import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'kirby-fullscreen-modal',
  templateUrl: './fullscreen-modal.component.html',
  styleUrls: ['./fullscreen-modal.component.scss'],
})
export class FullscreenModalComponent {
  @ViewChild(IonModal) modal: IonModal;

  close() {
    this.modal.dismiss(null, 'cancel');
  }
}
