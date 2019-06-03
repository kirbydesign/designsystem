import { Component } from '@angular/core';

@Component({
  selector: 'kirby-slide-button-example',
  templateUrl: './slide-button-example.component.html',
  styleUrls: ['./slide-button-example.component.scss'],
})
export class SlideButtonExampleComponent {
  public showAlert() {
    alert('Slide done');
  }
}
