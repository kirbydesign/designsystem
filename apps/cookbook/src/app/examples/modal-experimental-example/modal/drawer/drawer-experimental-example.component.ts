import { Component, ViewChild } from '@angular/core';
import { PlatformService } from '@kirbydesign/designsystem';

@Component({
  templateUrl: './drawer-experimental-example.component.html',
  styleUrls: ['./drawer-experimental-example.component.scss'],
})
export class DrawerModalExperimentalExampleComponent {
  constructor(private platformService: PlatformService) {}

  platform = this.platformService.isPhabletOrBigger() ? 'desktop' : 'mobile';
  open = false;

  openModal() {
    this.open = true;
  }

  closeModal() {
    this.open = false;
  }
}
