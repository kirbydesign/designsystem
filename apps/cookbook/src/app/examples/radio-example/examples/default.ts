import { Component } from '@angular/core';
import { RadioModule } from '@kirbydesign/designsystem/radio';

const config = {
  selector: 'cookbook-radio-default-example',
  template: `<kirby-radio-group aria-label="Select main course" [items]="['Bacon', 'Salami', 'Tenderloin']"></kirby-radio-group>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [RadioModule],
})
export class RadioDefaultExampleComponent {
  template: string = config.template;
}
