import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-data-table-card-example',
  template: `<kirby-card [hasPadding]="true">
      <table kirbyDataTable style="width: 100%;">
        <thead>
          <tr style="text-align: left;">
            <th>Hello there,</th>
            <th>Hello there,</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>General Kenobi</td>
            <td>General Kenobi</td>
          </tr>
        </tbody>
      </table>
    </kirby-card>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class DataTableCardExampleComponent {
  template: string = config.template;
}
