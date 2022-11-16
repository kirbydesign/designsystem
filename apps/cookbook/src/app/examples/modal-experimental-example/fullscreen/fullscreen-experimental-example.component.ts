import { Component } from '@angular/core';

@Component({
  templateUrl: './fullscreen-experimental-example.component.html',
})
export class FullscreenModalExperimentalExampleComponent {
  open = false;

  openModal() {
    this.open = true;
  }

  close() {
    this.open = false;
  }
}
