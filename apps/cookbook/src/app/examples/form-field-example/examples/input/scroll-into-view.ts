import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-form-field-scroll-into-view-example',
  template: `<label>Scroll-into-view wrapper</label>
<div scroll-into-view>
  <kirby-form-field>
    <input kirby-input placeholder="Focus me on device to scroll wrapper into view" />
  </kirby-form-field>
  <button kirby-button attentionLevel="2">OK</button>
</div>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./scroll-into-view.scss'],
})
export class FormFieldScrollIntoViewExampleComponent {
  template: string = config.template;
}
