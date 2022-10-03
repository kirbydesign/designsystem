import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-data-table-default-example',
  template: `<table kirbyTable>
  <thead kirbyThead>
    <tr kirbyTr>
      <th>Hello there,</th>
      <th>Han shot</th>
    </tr>
  </thead>
  <tbody kirbyTbody>
    <tr kirbyTr>
      <td>General Kenobi</td>
      <td>First</td>
    </tr>
    <tr kirbyTr>
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
