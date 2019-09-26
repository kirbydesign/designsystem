import { Component } from '@angular/core';

import { ShowcaseProperty } from './../../shared/showcase-properties/showcase-property';
declare var require: any;

@Component({
  selector: 'kirby-page-showcase',
  templateUrl: './page-showcase.component.html',
  styleUrls: ['./page-showcase.component.scss'],
})
export class PageShowcaseComponent {
  exampleHtml: string = require('../../examples/page-example/page-example.component.html');
  properties: ShowcaseProperty[] = [
    {
      name: 'onlyShowPageTitleInHeader',
      description: 'If true, page title and page title actions will only show in header',
      defaultValue: 'false',
      inputValues: ['true', 'false'],
    },
    {
      name: 'pageTitleAlign',
      description: 'align page title in content',
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
