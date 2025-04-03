import { Component } from '@angular/core';
import { ToastController, ToastHelper } from '@kirbydesign/designsystem/toast';
import { CheckboxConfirmExampleComponent } from './examples/confirm';
import { CheckboxDefaultExampleComponent } from './examples/default';
import { CheckboxListExampleComponent } from './examples/list';
import { CheckboxStatesExampleComponent } from './examples/states';
import { CheckboxSizesExampleComponent } from './examples/sizes';
import { CheckboxMultilineExampleComponent } from './examples/multiline';
import { CheckboxEventsExampleComponent } from './examples/events';
import { CheckboxIndeterminateListExampleComponent } from './examples/list-indeterminate';

@Component({
  selector: 'cookbook-checkbox-example',
  templateUrl: './checkbox-example.component.html',
  styleUrls: ['../_examples.shared.scss'],
  imports: [
    CheckboxConfirmExampleComponent,
    CheckboxDefaultExampleComponent,
    CheckboxListExampleComponent,
    CheckboxIndeterminateListExampleComponent,
    CheckboxStatesExampleComponent,
    CheckboxSizesExampleComponent,
    CheckboxMultilineExampleComponent,
    CheckboxEventsExampleComponent,
  ],
  providers: [ToastHelper, ToastController],
})
export class CheckboxExampleComponent {}
