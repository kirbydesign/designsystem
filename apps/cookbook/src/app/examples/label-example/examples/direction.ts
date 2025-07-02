import { Component } from '@angular/core';
import { ItemModule } from '@kirbydesign/designsystem/item';

const config = {
  selector: 'cookbook-label-example-direction',
  template: `<kirby-item>
  <kirby-label>
    <p class="kirby-item-title">Title</p>
    <p class="kirby-item-detail">Detail</p>
  </kirby-label>
</kirby-item>

<kirby-item>
  <kirby-label>
    <kirby-label direction="horizontal">
      <p class="kirby-item-title">Title</p>
      <p class="kirby-item-detail">Detail</p> 
    </kirby-label>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci.</p>
  </kirby-label>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrl: './_shared.scss',
  imports: [ItemModule],
})
export class LabelExampleDirectionComponent {
  template: string = config.template;
}
