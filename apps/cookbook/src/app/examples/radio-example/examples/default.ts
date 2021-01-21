import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-radio-default-example',
  template: `<kirby-radio-group [items]="['Bacon', 'Salami', 'Tenderloin']"></kirby-radio-group>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class RadioDefaultExampleComponent {
  template: string = config.template;
}
