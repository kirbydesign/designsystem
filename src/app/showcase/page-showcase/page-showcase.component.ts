import { Component } from '@angular/core';

import { ShowcaseProperty } from './../../shared/showcase-properties/showcase-property';
import { PageSimpleExampleComponent } from '~/app/examples/page-example/simple/page-simple-example.component';
import { PageAdvancedExampleComponent } from '~/app/examples/page-example/advanced/page-advanced-example.component';
declare var require: any;

@Component({
  selector: 'kirby-page-showcase',
  templateUrl: './page-showcase.component.html',
  styleUrls: ['./page-showcase.component.scss'],
})
export class PageShowcaseComponent {
  simpleExampleHtml: string = PageSimpleExampleComponent.template;
  advancedExampleHtml: string = PageAdvancedExampleComponent.template;
  properties: ShowcaseProperty[] = [
    {
      name: 'headerOnly',
      description: 'If true, page title and actions will only show in header',
      defaultValue: 'false',
      inputValues: ['true', 'false'],
    },
    {
      name: 'titleAlignment',
      description: 'Horizontal alignment of the page title within the content pane',
      defaultValue: 'left',
      inputValues: ['left', 'center', 'right'],
    },
    {
      name: 'defaultBackHref',
      description:
        'Back navigation only shows if any navigation has been done. To make it show even after page-reload provide the page with a default back href',
      defaultValue: 'null',
      inputValues: ['string'],
    },
  ];
}
