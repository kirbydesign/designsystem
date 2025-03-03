import { Component } from '@angular/core';
import { SectionHeaderComponent } from '@kirbydesign/designsystem/section-header';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { CardModule } from '@kirbydesign/designsystem/card';

const config = {
  selector: 'cookbook-section-header-heading-with-multiline-label',
  template: `<kirby-section-header>
  <kirby-label>
    <h3 heading> Section Header with multiline label</h3>
    <p label wrap>This label is quite lengthy, typically prone to truncation within a section header. However, with the <code>'wrap'</code> attribute applied, behold the magic of multiline functionality! Don't take my word for it; witness it yourself. It truly works. Can you believe that?</p>
  </kirby-label>
</kirby-section-header>
<kirby-card [hasPadding]="true">
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
export class SectionHeaderHeadingWithMultilineLabelExampleComponent {
  template: string = config.template;
}
