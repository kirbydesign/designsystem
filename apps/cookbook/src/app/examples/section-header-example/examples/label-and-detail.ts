import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-section-header-label-and-detail',
  template: `<kirby-section-header>
  <p label>Label</p>
  <p detail slot="end">Detail in end-slot</p>
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
export class SectionHeaderLabelAndDetailExampleComponent {
  template: string = config.template;
}
