import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-accordion-with-items-example',
  template: `<kirby-card>
  <kirby-accordion>
    <kirby-accordion-item
      title="Accordion in card with 3 items"
      [hasPadding]="false"
    >
      <kirby-item size="sm">
        <h3>Subitem 1</h3>
      </kirby-item>
      <kirby-divider></kirby-divider>
      <kirby-item size="sm">
        <h3>Subitem 2</h3>
      </kirby-item>
      <kirby-divider></kirby-divider>
      <kirby-item size="sm">
        <h3>Subitem 3</h3>
      </kirby-item>
    </kirby-accordion-item>
  </kirby-accordion>
    <kirby-accordion-item
      title="Accordion in card with 4 items"
      [hasPadding]="false"
    >
      <kirby-item size="sm">
        <h3>Subitem 4</h3>
      </kirby-item>
      <kirby-divider></kirby-divider>
      <kirby-item size="sm">
        <h3>Subitem 5</h3>
      </kirby-item>
      <kirby-divider></kirby-divider>
      <kirby-item size="sm">
        <h3>Subitem 6</h3>
      </kirby-item>
      <kirby-divider></kirby-divider>
      <kirby-item size="sm">
        <h3>Subitem 7</h3>
      </kirby-item>
    </kirby-accordion-item>
</kirby-card>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class AccordionWithItemsExampleComponent {
  template: string = config.template;
}
