import { Component } from '@angular/core';
import { CheckboxConfirmExampleComponent } from './examples/confirm';
import { CheckboxDefaultExampleComponent } from './examples/default';
import { CheckboxListExampleComponent } from './examples/list';
import { CheckboxStatesExampleComponent } from './examples/states';
import { CheckboxSizesExampleComponent } from './examples/sizes';
import { CheckboxMultilineExampleComponent } from './examples/multiline';
import { CheckboxEventsExampleComponent } from './examples/events';

@Component({
  selector: 'cookbook-checkbox-example',
  templateUrl: './checkbox-example.component.html',
  styleUrls: ['../_examples.shared.scss'],
  imports: [
    CheckboxConfirmExampleComponent,
    CheckboxDefaultExampleComponent,
    CheckboxListExampleComponent,
    CheckboxStatesExampleComponent,
    CheckboxSizesExampleComponent,
    CheckboxMultilineExampleComponent,
    CheckboxEventsExampleComponent,
  ],
})
export class CheckboxExampleComponent {}
