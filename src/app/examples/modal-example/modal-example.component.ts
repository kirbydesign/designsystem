import { Component, ViewContainerRef } from '@angular/core';
import { of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

import { ModalConfig } from '@kirbydesign/designsystem/modal';
import { ModalController } from '@kirbydesign/designsystem/modal';
import { FirstEmbeddedModalExampleComponent } from './first-embedded-modal-example/first-embedded-modal-example.component';

@Component({
  selector: 'kirby-modal-example',
  templateUrl: './modal-example.component.html',
  styleUrls: ['./modal-example.component.scss'],
})
export class ModalExampleComponent {
  private modalConfig: ModalConfig = {
    title: 'My Modal Title',
    flavor: 'modal',
    component: FirstEmbeddedModalExampleComponent,
    componentProps: {
      prop1: 'value1',
      prop2: 'value2',
    },
  };

  private drawerConfig: ModalConfig = {
    title: 'My Drawer Title',
    flavor: 'drawer',
    component: FirstEmbeddedModalExampleComponent,
    componentProps: {
      prop1: 'value1',
      prop2: 'value2',
    },
  };

  constructor(private modalController: ModalController, private vcRef: ViewContainerRef) {}

  showModal() {
    this.modalController.showModal(this.modalConfig, this.vcRef, this.onModalClose);
  }

  showReactiveModal() {
    this.delayData('Some Data')
      .pipe(
        map((data) => ({ prop1: data })),
        this.modalController.operators.showModal(this.modalConfig)
      )
      .subscribe((response) => console.log('Response from modal (in observable) was:', response));
  }

  showDrawer() {
    this.modalController.showModal(this.drawerConfig, this.vcRef, this.onDrawerClose);
  }

  showReactiveDrawer() {
    this.delayData('Some Data')
      .pipe(
        map((data) => ({ prop1: data })),
        this.modalController.operators.showModal(this.drawerConfig)
      )
      .subscribe((response) => console.log('Response from drawer (in observable) was:', response));
  }

  onModalClose(data: any): void {
    console.log('Callback from Embedded Modal:');
    console.log(`Data received: ${JSON.stringify(data)}`);
  }

  onDrawerClose(data: any): void {
    console.log('Callback from Embedded Drawer:');
    console.log(`Data received: ${JSON.stringify(data)}`);
  }

  private delayData(data: string) {
    const delayInSeconds = 2;
    return of(data).pipe(
      tap(() => console.log(`Delaying for ${delayInSeconds} seconds`)),
      delay(delayInSeconds * 1000)
    );
  }
}
