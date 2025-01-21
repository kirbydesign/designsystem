import { Component } from '@angular/core';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { AvatarComponent } from '@kirbydesign/designsystem/avatar';
import { IconModule } from '@kirbydesign/designsystem/icon';
import {
  DateInputDirective,
  FormFieldModule,
  InputComponent,
} from '@kirbydesign/designsystem/form-field';

const config = {
  selector: 'cookbook-item-example-input-numeric',
  template: `<kirby-item>
  <kirby-avatar slot="start">
    <kirby-icon name="moneybag"></kirby-icon>
  </kirby-avatar>
  <p class="kirby-item-title">Title</p>
  <kirby-form-field slot="end">
    <input type="number" kirby-input value="100.00" borderless="true"/>
  </kirby-form-field>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [
    ItemModule,
    AvatarComponent,
    IconModule,
    FormFieldModule,
    DateInputDirective,
    InputComponent,
  ],
})
export class ItemExampleInputNumericComponent {
  template: string = config.template;
}
