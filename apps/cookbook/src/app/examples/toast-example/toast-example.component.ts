import { Component } from '@angular/core';

import { ShowToastExampleComponent } from './examples/show-toast-example';

@Component({
  selector: 'cookbook-toast-example',
  templateUrl: './toast-example.component.html',
  styleUrl: '../_examples.shared.scss',
  imports: [ShowToastExampleComponent],
})
export class ToastExampleComponent {}
