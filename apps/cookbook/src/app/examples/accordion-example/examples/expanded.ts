import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-accordion-expanded-example',
  template: `<kirby-accordion>
      <kirby-accordion-item title="Title for accordion item 1" [isExpanded]="true">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta.
      </kirby-accordion-item>
      <kirby-accordion-item title="Title for accordion item 2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta.
      </kirby-accordion-item>
    </kirby-accordion>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class AccordionExpandedExampleComponent {
  template: string = config.template;
}
