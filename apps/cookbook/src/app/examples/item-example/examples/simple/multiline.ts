import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-simple-multiline',
  template: `<kirby-item>
  <kirby-label>
    <h3>Title</h3>
    <p wrap subtitle> With the 'wrap' attribute - text no longer faces the risk of abrupt truncation. With <code>'wrap'</code> in the mix, the content gracefully extends to the next line, seamlessly continuing its narrative. Take a glance, and you'll see how seamlessly it moves to the next line, maintaining readability and preserving the flow of information.</p>
    <p detail>Detail</p>
  </kirby-label>
  <data slot="end" value="value">Value</data>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemExampleSimpleMultilineComponent {
  template: string = config.template;
}
