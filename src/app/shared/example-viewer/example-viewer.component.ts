import { Component, Input } from '@angular/core';

@Component({
  selector: 'kirby-example-viewer',
  templateUrl: './example-viewer.component.html',
  styleUrls: ['./example-viewer.component.scss'],
})
export class ExampleViewerComponent {
  @Input() html: string;
  @Input() ts: string;
  @Input() expanded: boolean;
}
