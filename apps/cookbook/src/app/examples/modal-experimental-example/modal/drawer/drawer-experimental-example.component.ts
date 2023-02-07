import { Component, ViewChild } from '@angular/core';
import { KirbyAnimation } from '@kirbydesign/designsystem';

@Component({
  templateUrl: './drawer-experimental-example.component.html',
  styleUrls: ['./drawer-experimental-example.component.scss'],
})
export class DrawerModalExperimentalExampleComponent {
  open = false;

  openModal() {
    this.open = true;
  }

  closeModal() {
    this.open = false;
  }
}
