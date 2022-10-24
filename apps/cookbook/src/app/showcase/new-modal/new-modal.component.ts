import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'cookbook-modal',
  templateUrl: './new-modal.component.html',
  styleUrls: ['./new-modal.component.scss'],
})
export class NewModalComponent {
  @ViewChild(IonModal) modal: IonModal;
}
