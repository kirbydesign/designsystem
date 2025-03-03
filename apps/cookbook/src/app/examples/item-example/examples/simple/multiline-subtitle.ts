import { Component } from '@angular/core';
import { ItemModule } from '@kirbydesign/designsystem/item';

const config = {
  selector: 'cookbook-item-example-simple-multiline-subtitle',
  template: `<kirby-item>
  <kirby-label>
    <p class="kirby-item-title">Title</p>
    <p class="kirby-item-wrap kirby-item-subtitle">With the '.kirby-item-wrap' CSS class - text no longer faces the risk of abrupt truncation. With <code>'.kirby-item-wrap'</code> in the mix, the content gracefully extends to the next line, seamlessly continuing its narrative. Take a glance, and you'll see how seamlessly it moves to the next line, maintaining readability and preserving the flow of information.</p>
    <p class="kirby-item-detail">Detail</p>
  </kirby-label>
  <data slot="end" value="value">Value</data>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [ItemModule],
})
export class ItemExampleSimpleMultilineSubtitleComponent {
  template: string = config.template;
}
