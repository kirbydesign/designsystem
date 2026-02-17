import { Component } from '@angular/core';
import { ToastExampleDefaultComponent } from './examples/default';
import { ToastExampleDurationComponent } from './examples/duration';
import { ToastExampleDismissComponent } from './examples/dismiss';

@Component({
  selector: 'cookbook-toast-example',
  templateUrl: './toast-example.component.html',
  styleUrls: ['./toast-example.component.scss'],
  imports: [
    ToastExampleDefaultComponent,
    ToastExampleDurationComponent,
    ToastExampleDismissComponent,
  ],
})
export class ToastExampleComponent {}
