import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'kirby-sheet-modal',
  templateUrl: './sheet-modal.component.html',
  styleUrls: ['./sheet-modal.component.scss'],
})
export class SheetModalComponent {
  @ViewChild(IonModal) modal: IonModal;

  close() {
    this.modal.dismiss(null, 'cancel');
  }
}
