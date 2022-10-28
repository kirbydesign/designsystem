import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalWrapperComponent } from '@kirbydesign/designsystem/components/new-modal/modal-wrapper/modal-wrapper.component';
import { CustomModalComponent } from '@kirbydesign/designsystem';

@Component({
  selector: 'cookbook-new-modal-showcase',
  templateUrl: './new-modal-showcase.component.html',
  styleUrls: ['./new-modal-showcase.component.scss'],
})
export class NewModalShowcaseComponent {
  constructor(private modalCtrl: ModalController) {}

  async openModal(flavor?: string) {
    const modal = await this.modalCtrl.create({
      component: flavor === 'custom' ? CustomModalComponent : ModalWrapperComponent,
      cssClass: flavor === 'custom' ? 'example-modal' : '',
      // breakpoints: [0, 0.5],
      // initialBreakpoint: 0.5,
    });
    modal.present();
  }
}
