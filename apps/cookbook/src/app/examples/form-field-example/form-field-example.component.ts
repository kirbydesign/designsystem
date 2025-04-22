import { Component, HostListener } from '@angular/core';

import { InputSize } from '@kirbydesign/designsystem';
import { WindowRef } from '@kirbydesign/designsystem/types';
import { CheckboxComponent } from '@kirbydesign/designsystem/checkbox';
import { ExampleConfigurationWrapperComponent } from '../example-configuration-wrapper/example-configuration-wrapper.component';
import { FormFieldExampleConfigurationComponent } from './form-field-example-configuration-component/form-field-example-configuration.component';
import { FormFieldInputDefaultExampleComponent } from './examples/input/default';
import { FormFieldInputColorExampleComponent } from './examples/input/color';
import { FormFieldInputLabelExampleComponent } from './examples/input/label';
import { FormFieldInputLabelMessageExampleComponent } from './examples/input/label-message';
import { FormFieldInputAffixExampleComponent } from './examples/input/affix';
import { FormFieldInputCounterExampleComponent } from './examples/input/counter';
import { FormFieldInputCounterFormExampleComponent } from './examples/input/reactive-forms';
import { FormFieldInputNumericExampleComponent } from './examples/input/numeric';
import { FormFieldInputDateExampleComponent } from './examples/input/date';
import { FormFieldInputDateNativeExampleComponent } from './examples/input/date-native';
import { FormFieldInputDisabledExampleComponent } from './examples/input/disabled';
import { FormFieldInputErrorExampleComponent } from './examples/input/error';
import { FormFieldInputBorderlessExampleComponent } from './examples/input/borderless';
import { FormFieldFocusExampleComponent } from './examples/input/focus';
import { FormFieldTextareaDefaultExampleComponent } from './examples/textarea/default';
import { FormFieldTextareaLabelExampleComponent } from './examples/textarea/label';
import { FormFieldTextareaCounterExampleComponent } from './examples/textarea/counter';
import { FormFieldTextareaCounterFormExampleComponent } from './examples/textarea/reactive-forms';

@Component({
  selector: 'cookbook-form-field-example',
  templateUrl: './form-field-example.component.html',
  styleUrls: ['./form-field-example.component.scss'],
  imports: [
    FormFieldExampleConfigurationComponent,
    FormFieldInputDefaultExampleComponent,
    FormFieldInputColorExampleComponent,
    FormFieldInputLabelExampleComponent,
    FormFieldInputLabelMessageExampleComponent,
    FormFieldInputAffixExampleComponent,
    FormFieldInputCounterExampleComponent,
    FormFieldInputCounterFormExampleComponent,
    FormFieldInputNumericExampleComponent,
    FormFieldInputDateExampleComponent,
    FormFieldInputDateNativeExampleComponent,
    FormFieldInputDisabledExampleComponent,
    FormFieldInputErrorExampleComponent,
    FormFieldInputBorderlessExampleComponent,
    FormFieldFocusExampleComponent,
    FormFieldTextareaDefaultExampleComponent,
    FormFieldTextareaLabelExampleComponent,
    FormFieldTextareaCounterExampleComponent,
    FormFieldTextareaCounterFormExampleComponent,
    ExampleConfigurationWrapperComponent,
    CheckboxComponent,
  ],
})
export class FormFieldExampleComponent {
  constructor(private windowRef: WindowRef) {}
  size: InputSize;
  showDummyKeyboard = !!this.windowRef.nativeWindow.sessionStorage.getItem(
    'kirby-cookbook-show-dummy-keyboard'
  );

  toggleDummyKeyboard(show: boolean) {
    const sessionKey = 'kirby-cookbook-show-dummy-keyboard';
    this.showDummyKeyboard = show;
    this.showDummyKeyboard
      ? this.windowRef.nativeWindow.sessionStorage.setItem(sessionKey, 'true')
      : this.windowRef.nativeWindow.sessionStorage.removeItem(sessionKey);
    // Timeout prevents ExpressionChangedAfterItHasBeenCheckedError:
    setTimeout(() =>
      this.windowRef.nativeWindow.dispatchEvent(
        new CustomEvent('kirbyToggleDummyKeyboard', { detail: this.showDummyKeyboard })
      )
    );
  }

  @HostListener('window:kirbyToggleDummyKeyboard', ['$event.detail'])
  _onToggleDummyKeyboard(show: boolean) {
    this.showDummyKeyboard = show;
  }
}
