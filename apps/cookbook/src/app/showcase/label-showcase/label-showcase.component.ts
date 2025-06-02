import { Component } from '@angular/core';
import { ExampleViewerComponent } from '../../shared/example-viewer/example-viewer.component';
import { LabelExampleItemComponent } from '../../examples/label-example/examples/item';
import { LabelFormFieldInputLabelExampleComponent } from '../../examples/label-example/examples/label';

@Component({
  selector: 'cookbook-label-showcase',
  templateUrl: './label-showcase.component.html',
  styleUrls: ['./label-showcase.component.scss'],
  imports: [
    ExampleViewerComponent,
    LabelExampleItemComponent,
    LabelFormFieldInputLabelExampleComponent,
  ],
})
export class LabelShowcaseComponent {
  // Add properties and methods as needed for the showcase
}
