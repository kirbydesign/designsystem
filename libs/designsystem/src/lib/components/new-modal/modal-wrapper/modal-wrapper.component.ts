import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'kirby-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  styleUrls: ['./modal-wrapper.component.scss'],
})
export class ModalWrapperComponent {
  constructor(private modalCtrl: ModalController) {}
}
