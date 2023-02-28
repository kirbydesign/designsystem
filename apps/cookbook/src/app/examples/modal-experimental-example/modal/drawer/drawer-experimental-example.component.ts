import { Component } from '@angular/core';
import { PlatformService } from '@kirbydesign/designsystem';

export const drawerExampleTemplateHTML = `<kirby-modal-experimental
  [flavor]="'drawer'"
  [open]="open"
  [title]="'Drawer'"
  [breakpoints]="[0, 0.5, 1]"
  [initialBreakpoint]="0.5"
  (willDismiss)="closeDrawer()"
>  
    <p>
      Lorem ipsum dolor sit amet...
    </p>
</kirby-modal-experimental>

<button kirby-button (click)="openDrawer()">Open Drawer</button>
`;

export const drawerExampleTemplateTS = `openDrawer() { this.open = true; }`;

@Component({
  templateUrl: './drawer-experimental-example.component.html',
  styleUrls: ['./drawer-experimental-example.component.scss'],
})
export class DrawerModalExperimentalExampleComponent {
  constructor(private platformService: PlatformService) {}

  flavor = this.platformService.isPhabletOrBigger() ? 'modal' : 'drawer';
  open = false;

  openDrawer() {
    this.open = true;
  }

  closeDrawer() {
    this.open = false;
  }
}
