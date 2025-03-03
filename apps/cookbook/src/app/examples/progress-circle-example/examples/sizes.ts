import { Component } from '@angular/core';
import { ProgressCircleComponent } from '@kirbydesign/designsystem/progress-circle';

const config = {
  selector: 'cookbook-progress-circle-example-sizes',
  template: `<kirby-progress-circle size="sm" value="25" themeColor="danger"><p>sm</p></kirby-progress-circle>
<kirby-progress-circle size="md" value="50" themeColor="warning"><p>md <em>(default)</em></p></kirby-progress-circle>
<kirby-progress-circle size="lg" value="75" themeColor="success"><p>lg</p></kirby-progress-circle>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styles: [
    `
      :host {
        display: flex !important;
        align-items: center;
      }

      kirby-progress-circle {
        margin-right: 20px;
      }

      kirby-progress-circle p {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: 100%;
        margin: 0;
        text-align: center;
        font-size: 12px;
        line-height: 16px;
      }

      kirby-progress-circle p em {
        font-size: 10px;
      }
    `,
  ],
  imports: [ProgressCircleComponent],
})
export class ProgressCircleExampleSizesComponent {
  template: string = config.template;
}
