import { Component } from '@angular/core';
import { ToastController, ToastHelper } from '@kirbydesign/designsystem/toast';
import { DropdownExampleDefaultComponent } from './examples/default';
import { DropdownExampleScrollComponent } from './examples/scroll';
import { DropdownExamplePreSelectedComponent } from './examples/pre-selected';
import { DropdownExampleExpandComponent } from './examples/expand';
import { DropdownExampleRightAlignedComponent } from './examples/right-aligned';
import { DropdownExampleAttentionLevelComponent } from './examples/attention-level';
import { DropdownExampleItemSelectComponent } from './examples/item-select';
import { DropdownExampleCustomItemTemplateComponent } from './examples/custom-item-template';
import { DropdownExampleNgFormsComponent } from './examples/ng-forms';
import { DropdownExampleStatesComponent } from './examples/states';
import { DropdownExampleFormFieldComponent } from './examples/form-field';

@Component({
  selector: 'cookbook-dropdown-example',
  templateUrl: './dropdown-example.component.html',
  styleUrls: ['./dropdown-example.component.scss'],
  imports: [
    DropdownExampleDefaultComponent,
    DropdownExampleScrollComponent,
    DropdownExamplePreSelectedComponent,
    DropdownExampleExpandComponent,
    DropdownExampleRightAlignedComponent,
    DropdownExampleAttentionLevelComponent,
    DropdownExampleItemSelectComponent,
    DropdownExampleCustomItemTemplateComponent,
    DropdownExampleNgFormsComponent,
    DropdownExampleStatesComponent,
    DropdownExampleFormFieldComponent,
  ],
  providers: [ToastHelper, ToastController],
})
export class DropdownExampleComponent {
  size: string = 'md';

  onSizeChange(size: string) {
    this.size = size;
  }
}
