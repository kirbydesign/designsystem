import { Component } from '@angular/core';

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
    <h3>Title</h3>
    <data slot="end">Value</data>
  </kirby-item>
</kirby-card>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class SectionHeaderHeadingWithMultilineLabelExampleComponent {
  template: string = config.template;
}
