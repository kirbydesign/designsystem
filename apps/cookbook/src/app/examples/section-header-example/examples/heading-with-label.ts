import { Component } from '@angular/core';

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
    <h3>Title</h3>
    <data slot="end">Value</data>
  </kirby-item>
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
export class SectionHeaderHeadingWithLabelExampleComponent {
  template: string = config.template;
}
