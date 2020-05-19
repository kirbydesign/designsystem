import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-progress-circle-example-content-icon',
  template: `<kirby-progress-circle themeColor="danger" value="70">
              <div>
                <kirby-icon name="pension" size="md"></kirby-icon>
              </div>
            </kirby-progress-circle>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styles: [
    'div { width: 100%; height: 100%; background-color: white; display: flex; justify-content: center; align-items: center; }',
  ],
})
export class ProgressCircleExampleContentIconComponent {
  template: string = config.template;
}
