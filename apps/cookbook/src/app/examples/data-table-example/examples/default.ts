import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-data-table-default-example',
  template: `<table kirby-table class="table-layout-fixed">
  <thead kirby-thead>
    <tr kirby-tr>
      <th>Hello there,</th>
      <th>Han shot</th>
    </tr>
  </thead>
  <tbody kirby-tbody>
    <tr kirby-tr>
      <td>General Kenobi</td>
      <td>First</td>
    </tr>
    <tr kirby-tr>
      <td>You are a bold one.</td>
      <td>Last</td>
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
