import { Component } from '@angular/core';
import { CardModule } from '@kirbydesign/designsystem/card';
import { AccordionModule } from '@kirbydesign/designsystem/accordion';

const config = {
  selector: 'cookbook-accordion-card-example',
  template: `<kirby-card>
      <kirby-accordion>
        <kirby-accordion-item title="Title for accordion item 1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta.
        </kirby-accordion-item>
        <kirby-accordion-item title="Title for accordion item 2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta.
        </kirby-accordion-item>
        <kirby-accordion-item title="Title for accordion item 3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta.
        </kirby-accordion-item>
        <kirby-accordion-item title="Title for accordion item 4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta.
        </kirby-accordion-item>
      </kirby-accordion>
    </kirby-card>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [CardModule, AccordionModule],
})
export class AccordionCardExampleComponent {
  template: string = config.template;
}
