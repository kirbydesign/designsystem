import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-data-table-card-example',
  template: `<kirby-card [hasPadding]="true">
  <table kirbyTable>
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
  </table>
</kirby-card>
  `,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class DataTableCardExampleComponent {
  template: string = config.template;
}
