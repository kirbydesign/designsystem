import { Component } from '@angular/core';

@Component({
  selector: 'cookbook-fixed-footer-tabs-example',
  templateUrl: './fixed-footer-tabs-example.component.html',
  styleUrls: ['./fixed-footer-tabs-example.component.scss'],
})
export class FixedFooterTabsExampleComponent {
  constructor() {}

  openMenu() {
    alert('Open menu');
  }
}
