import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-data-table-default-example',
  template: `
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
  </table>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class DataTableDefaultExampleComponent {
  template: string = config.template;
}
