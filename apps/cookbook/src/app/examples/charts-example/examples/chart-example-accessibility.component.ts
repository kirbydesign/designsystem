import { Component } from '@angular/core';
import { ChartsModule } from '@kirbydesign/designsystem/chart';

const config = {
  selector: 'cookbook-chart-example-accessibility',
  template: `<kirby-chart 
  type="column" 
  [data]="[739, 1200, 584, 902, 30]" 
  [labels]="['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']"
>
  <table>
    <tr>
      <th>Day</th>
      <th>Number of visitors</th>
    </tr>
    <tr>
      <td>Monday</td>
      <td>739</td>
    </tr>
    <tr>
      <td>Tuesday</td>
      <td>1200</td>
    </tr>
    <tr>
      <td>Wednesday</td>
      <td>584</td>
    </tr>
    <tr>
      <td>Thursday</td>
      <td>902</td>
    </tr>
    <tr>
      <td>Friday</td>
      <td>30</td>
    </tr>
  </table>
</kirby-chart>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [ChartsModule],
})
export class ChartExampleAccessibilityComponent {
  template: string = config.template;
}
