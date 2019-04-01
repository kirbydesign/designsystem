import { ModalDialogService } from 'nativescript-angular/directives/dialogs';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page';

import { ModalComponent } from '~/kirby/components/modal/modal.component';

@Component({
  selector: 'kirby-modal-example',
  templateUrl: './modal-example.component.html',
  styleUrls: ['./modal-example.component.scss'],
})
export class ModalExampleComponent implements OnInit {
  mainPage: Page;

  constructor(private modal: ModalDialogService, private vcRef: ViewContainerRef) {}

  ngOnInit() {
    // this.mainPage = <Page>args.object;
  }

  openModal() {
    this.modal
      .showModal(ModalComponent, {
        context: {
          message: "I'm the context",
        },
        fullscreen: false,
        viewContainerRef: this.vcRef,
      })
      .then((response) => {
        console.log(response);
      });
  }
}
