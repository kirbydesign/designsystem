import { Component } from '@angular/core';
import { SectionHeaderComponent } from '@kirbydesign/designsystem/section-header';
import { ItemComponent, LabelComponent } from '@kirbydesign/designsystem/item';
import { CardComponent } from '@kirbydesign/designsystem/card';

const config = {
  selector: 'cookbook-section-header-heading-with-multiline-label',
  template: `<kirby-section-header>
  <kirby-label>
    <h4 heading> Section Header with multiline label</h4>
    <p label wrap>Label that will not be truncated because it wraps to multiple lines when text cannot fit within the container. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  </kirby-label>
</kirby-section-header>
<kirby-card>
  <kirby-item>
    <p class="kirby-item-title">Title</p>
    <data slot="end">Value</data>
  </kirby-item>
</kirby-card>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [SectionHeaderComponent, ItemComponent, CardComponent, LabelComponent],
})
export class SectionHeaderHeadingWithMultilineLabelExampleComponent {
  template: string = config.template;
}
