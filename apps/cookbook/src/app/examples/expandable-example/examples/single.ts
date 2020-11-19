import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-expandable-example-single',
  template: `<kirby-expandable title="Title for expandable">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta.
    </kirby-expandable>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ExpandableExampleSingleComponent {
  template: string = config.template;
}
