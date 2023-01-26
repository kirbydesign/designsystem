import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-action-list-default-example',
  template: `<kirby-action-list></kirby-action-list>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ActionListDefaultExampleComponent {
  template: string = config.template;
}
