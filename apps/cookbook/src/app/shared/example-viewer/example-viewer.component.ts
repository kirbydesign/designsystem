import { Component, Input } from '@angular/core';

import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { CodeViewerComponent } from '../code-viewer/code-viewer.component';

@Component({
  selector: 'cookbook-example-viewer',
  templateUrl: './example-viewer.component.html',
  styleUrls: ['./example-viewer.component.scss'],
  imports: [ButtonComponent, CodeViewerComponent],
})
export class ExampleViewerComponent {
  @Input() html: string;
  @Input() ts: string;
  @Input() css: string;
  @Input() expanded: boolean;
}
