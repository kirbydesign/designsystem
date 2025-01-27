import { Component } from '@angular/core';
import { SectionHeaderComponent } from '@kirbydesign/designsystem/section-header';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { CardModule } from '@kirbydesign/designsystem/card';

const config = {
  selector: 'cookbook-section-header-heading-with-label',
  template: `<kirby-section-header>
  <kirby-label>
    <h3 heading>Section Header</h3>
    <p label>With a label</p>
  </kirby-label>
</kirby-section-header>
<kirby-card [hasPadding]="true">
  <kirby-item>
    <p class="kirby-item-title">Title</p>
    <data slot="end">Value</data>
  </kirby-item>
  <kirby-item>
    <p class="kirby-item-title">Title</p>
    <data slot="end">Value</data>
  </kirby-item>
</kirby-card>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [SectionHeaderComponent, ItemModule, CardModule],
})
export class SectionHeaderHeadingWithLabelExampleComponent {
  template: string = config.template;
}
