import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalConfig, ModalController } from '@kirbydesign/designsystem';

import { ModalEmbeddedAlertExampleComponent } from './alert-example/modal-example-embedded-alert.component';

@Component({
  template: `
    <cookbook-modal-example-alert-with-guard-stepper></cookbook-modal-example-alert-with-guard-stepper>
  `,
  styleUrls: ['./modal-example-simple.component.scss'],
})
export class ModalExampleAlertWithGuardComponent implements OnInit {
  constructor(private modalController: ModalController, private router: Router) {}

  ngOnInit(): void {
    if (this.router.url.endsWith('/modal-with-guard-open')) {
      this.showModal();
    }
  }

  showModal() {
    const config: ModalConfig = {
      component: ModalEmbeddedAlertExampleComponent,
      flavor: 'modal',
    };

    this.modalController.showModal(config);
  }
}
