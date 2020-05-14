import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-progress-circle-example-content-icon',
  template: `<kirby-progress-circle themeColor="danger" value="70">
                <kirby-icon name="pension" size="md"></kirby-icon>
            </kirby-progress-circle>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ProgressCircleExampleContentIconComponent {
  template: string = config.template;
}
