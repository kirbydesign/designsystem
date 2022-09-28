import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-data-table-default-example',
  template: `<table kirbyTable>
  <thead kirbyThead>
    <tr kirbyTr>
      <th kirbyTh>Hello there,</th>
      <th kirbyTh>Hello there,</th>
    </tr>
  </thead>
  <tbody kirbyTbody>
    <tr kirbyTr>
      <td kirbyTd>General Kenobi</td>
      <td kirbyTd>General Kenobi</td>
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
