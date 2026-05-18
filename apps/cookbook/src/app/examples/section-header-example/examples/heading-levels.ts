import { Component } from '@angular/core';
import { SectionHeaderComponent } from '@kirbydesign/designsystem/section-header';
import { ItemComponent, LabelComponent } from '@kirbydesign/designsystem/item';
import { CardComponent } from '@kirbydesign/designsystem/card';

const config = {
  selector: 'cookbook-section-header-heading-levels',
  template: `<kirby-section-header>
  <kirby-label>
    <h2 heading>Large heading</h2>
    <p label>Label</p>
  </kirby-label>
</kirby-section-header>
<kirby-card>
  <kirby-item>
    <p class="kirby-item-title">Title</p>
    <data slot="end">Value</data>
  </kirby-item>
</kirby-card>

<kirby-section-header>
  <kirby-label>
    <h3 heading>Medium heading</h3>
    <p label>Label</p>
  </kirby-label>
</kirby-section-header>
<kirby-card>
  <kirby-item>
    <p class="kirby-item-title">Title</p>
    <data slot="end">Value</data>
  </kirby-item>
</kirby-card>

<kirby-section-header>
  <kirby-label>
    <h4 heading>Normal heading</h4>
    <p label>Label</p>
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
  styles: [
    `
      kirby-section-header:not(:first-child) {
        margin-top: var(--kirby-spacing-l);
      }
    `,
  ],
})
export class SectionHeaderHeadingLevelsExampleComponent {
  template: string = config.template;
}
