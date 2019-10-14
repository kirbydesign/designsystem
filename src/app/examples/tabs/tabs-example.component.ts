import { Component } from '@angular/core';

@Component({
  selector: 'kirby-tabs-example',
  templateUrl: './tabs-example.component.html',
  styleUrls: ['./tabs-example.component.scss'],
})
export class TabsExampleComponent {
  constructor() {}

  openMenu() {
    alert('Open menu');
  }
}
