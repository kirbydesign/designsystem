import { Component } from '@angular/core';

import { AlertConfig, ModalController } from '@kirbydesign/designsystem';
import { SimpleSlideButtonExampleComponent } from './examples/simple';
import { ExpandBlockSlideButtonExampleComponent } from './examples/expand-block';

const config = {
  template: `<kirby-slide-button
  [text]="'Slide to confirm'"
  aria-label="Confirm"
  (slideDone)="showAlert()"
  aria-label="Unlock"
></kirby-slide-button>
<kirby-slide-button
  [text]="'Slide to confirm'"
  aria-label="Confirm"
  expand="block"
  (slideDone)="showAlert()"
  aria-label="Transfer"
></kirby-slide-button>`,
};
@Component({
  selector: 'cookbook-slide-button-example',
  templateUrl: './slide-button-example.component.html',
  styleUrl: './slide-button-example.component.scss',
  imports: [SimpleSlideButtonExampleComponent, ExpandBlockSlideButtonExampleComponent],
})
export class SlideButtonExampleComponent {
  template: string = config.template;
}
