import { Component } from '@angular/core';

import { ShowcaseProperty } from './../../shared/showcase-properties/showcase-property';
import { PageSimpleExampleComponent } from '~/app/examples/page-example/simple/page-simple-example.component';
import { PageAlignmentAndToolbarTitleExampleComponent } from '~/app/examples/page-example/alignment-and-toolbar-title/page-alignment-and-toolbar-title-example.component';
import { PageAdvancedExampleComponent } from '~/app/examples/page-example/advanced/page-advanced-example.component';

@Component({
  selector: 'kirby-page-showcase',
  templateUrl: './page-showcase.component.html',
  styleUrls: ['./page-showcase.component.scss'],
})
export class PageShowcaseComponent {
  simpleExampleHtml: string = PageSimpleExampleComponent.template;
  alignmentAndToolbarTitleExampleHtml: string =
    PageAlignmentAndToolbarTitleExampleComponent.template;
  advancedExampleHtml: string = PageAdvancedExampleComponent.template;
  properties: ShowcaseProperty[] = [
    {
      name: 'title',
      description:
        'The title of the page. Will stick in the toolbar - including action buttons, if any - when the page is scrolled below the title.',
      defaultValue: '',
      inputValues: ['string'],
    },
    {
      name: 'toolbarTitle',
      description:
        'An alternative text for the title in the toolbar. If `toolbarTitle` is specified instead of `title`, the page title and actions will only be shown in the toolbar and not on the page itself.',
      defaultValue: '',
      inputValues: ['string'],
    },
    {
      name: 'titleAlignment',
      description: 'Horizontal alignment of the page title within the content pane.',
      defaultValue: 'left',
      inputValues: ['left', 'center', 'right'],
    },
    {
      name: 'defaultBackHref',
      description:
        'Back navigation only shows if any navigation has been done. To make it show even after page-reload provide the page with a `defaultBackHref` e.g. "/".',
      defaultValue: '',
      inputValues: ['string'],
    },
  ];

  cssProperties: ShowcaseProperty[] = [
    {
      name: '--page-title-margin-bottom',
      description: 'Spacing between page title and page content.',
      defaultValue: `size('xl')`,
      inputValues: ['unit'],
    },
  ];
}
