import { Component } from '@angular/core';
import { DataGridComponent } from '@kirbydesign/designsystem/data-grid';

import { Customer, customers } from '../example-data';
import { stringifyPretty } from '~/app/shared/code-viewer/code-viewer.component';

const config = {
  selector: 'cookbook-data-grid-default-example',
  template: `<kirby-data-grid></kirby-data-grid>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  imports: [DataGridComponent],
})
export class DataGridDefaultExampleComponent {
  template: string = config.template;
  data: Customer[] = customers;
  dataSnippet = `customers = ${stringifyPretty(this.data)};`;
}
