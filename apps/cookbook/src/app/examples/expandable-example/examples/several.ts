import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-expandable-example-several',
  template: `<div class="expandable-list">
      <kirby-expandable title="Title for expandable 1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta.
      </kirby-expandable>
      <kirby-expandable title="Title for expandable 2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta.
      </kirby-expandable>
      <kirby-expandable title="Title for expandable 3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta.
      </kirby-expandable>
      <kirby-expandable title="Title for expandable 4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non neque vitae felis ultricies imperdiet in ut orci. Aenean sodales, augue ac consectetur sodales, neque velit condimentum nulla, at ultrices dolor tortor a nunc. Proin tellus nibh, venenatis eget quam ut, blandit cursus ante. Pellentesque convallis pretium orci vitae porta.
      </kirby-expandable>
    </div>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ExpandableExampleSeveralComponent {
  template: string = config.template;
}
