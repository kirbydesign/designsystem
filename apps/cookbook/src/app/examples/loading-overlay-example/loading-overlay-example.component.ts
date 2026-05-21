import { Component } from '@angular/core';
import { CardExampleComponent } from './examples/card';
import { ServiceExampleComponent } from './examples/service';
import { DefaultExampleComponent } from './examples/default';

@Component({
  selector: 'cookbook-loading-overlay-example',
  templateUrl: './loading-overlay-example.component.html',
  styleUrls: ['./loading-overlay-example.component.scss'],
  imports: [CardExampleComponent, DefaultExampleComponent, ServiceExampleComponent],
})
export class LoadingOverlayExampleComponent {}
