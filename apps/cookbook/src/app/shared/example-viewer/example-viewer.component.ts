import { Component, Input } from '@angular/core';

@Component({
  selector: 'cookbook-example-viewer',
  templateUrl: './example-viewer.component.html',
  styleUrls: ['./example-viewer.component.scss'],
})
export class ExampleViewerComponent {
  @Input() html: string;
  @Input() ts: string;
  @Input() css: string;
  @Input() expanded: boolean;
}
