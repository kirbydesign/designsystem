import { Component } from '@angular/core';
import { ToastController, ToastHelper } from '@kirbydesign/designsystem/toast';
import { RadioExampleBindingComponent } from './examples/binding';
import { RadioStatesExampleComponent } from './examples/states';
import { RadioSizesExampleComponent } from './examples/sizes';
import { RadioMultilineExampleComponent } from './examples/multiline';
import { RadioCustomContentExampleComponent } from './examples/custom';
import { RadioInFormFieldExampleComponent } from './examples/in-form-field';
import { RadioInItemExampleComponent } from './examples/in-item';
import { RadioReactiveFormsExampleComponent } from './examples/reactive-forms';
import { RadioTemplateDrivenFormsExampleComponent } from './examples/template-driven-forms';

@Component({
  selector: 'cookbook-radio-example',
  templateUrl: './radio-example.component.html',
  styleUrls: ['./radio-example.component.scss'],
  imports: [
    RadioExampleBindingComponent,
    RadioStatesExampleComponent,
    RadioSizesExampleComponent,
    RadioMultilineExampleComponent,
    RadioCustomContentExampleComponent,
    RadioInFormFieldExampleComponent,
    RadioInItemExampleComponent,
    RadioReactiveFormsExampleComponent,
    RadioTemplateDrivenFormsExampleComponent,
  ],
  providers: [ToastHelper, ToastController],
})
export class RadioExampleComponent {}
