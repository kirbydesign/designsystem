import { Component } from '@angular/core';
import { ItemComponent } from '@kirbydesign/designsystem/item';

const config = {
  selector: 'cookbook-item-example-text',
  template: `<kirby-item>
  <p class="kirby-item-title">Title that will be truncated because it is one long paragraph that cannot fit within the container. Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
</kirby-item>
  
<kirby-item>
  <kirby-label>
    <p class="kirby-item-wrap kirby-item-title">Title that will not be truncated because it wraps to multiple lines when text cannot fit within the container. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  </kirby-label>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrl: './_shared.scss',
  imports: [ItemComponent],
})
export class ItemExampleTextComponent {
  template: string = config.template;
}
