import { Component } from '@angular/core';
import { SectionHeaderComponent } from '@kirbydesign/designsystem/section-header';
import { CardModule } from '@kirbydesign/designsystem/card';
import { ItemModule } from '@kirbydesign/designsystem/item';

const config = {
  selector: 'cookbook-section-header-label-and-detail',
  template: `<kirby-section-header>
  <p label>Label</p>
  <p detail slot="end">Detail in end-slot</p>
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
  imports: [SectionHeaderComponent, CardModule, ItemModule],
})
export class SectionHeaderLabelAndDetailExampleComponent {
  template: string = config.template;
}
