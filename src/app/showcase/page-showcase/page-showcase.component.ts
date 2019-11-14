import { Component } from '@angular/core';

import { ShowcaseProperty } from './../../shared/showcase-properties/showcase-property';
import { PageSimpleExampleComponent } from '~/app/examples/page-example/simple/page-simple-example.component';
import { PageAlignmentAndToolbarTitleExampleComponent } from '~/app/examples/page-example/alignment-and-toolbar-title/page-alignment-and-toolbar-title-example.component';
import { PageFixedTitleAndActionsExampleComponent } from '~/app/examples/page-example/fixed-title-and-actions/page-fixed-title-and-actions-example.component';
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
  fixedTitleAndActionsExampleHtml: string = PageFixedTitleAndActionsExampleComponent.template;
  fixedCustomTitleExampleHtml: string =
    PageFixedTitleAndActionsExampleComponent.customTitleTemplate;
  fixedActionsExampleHtml: string = PageFixedTitleAndActionsExampleComponent.fixedActionsTemplate;
  advancedExampleHtml: string = PageAdvancedExampleComponent.template;
  properties: ShowcaseProperty[] = [
    {
      name: 'title',
      description:
        'The title of the page. Will stick in the toolbar - including action buttons, if any - when the page is scrolled below the title.',
      inputValues: ['string'],
    },
    {
      name: 'toolbarTitle',
      description:
        'An alternative text for the title in the toolbar. If `toolbarTitle` is specified instead of `title`, the page title and actions will only be shown in the toolbar and not on the page itself.',
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
      inputValues: ['string'],
    },
  ];
  events: ShowcaseProperty[] = [
    {
      name: 'enter',
      description: 'Emitted when the page has animated into view',
      inputValues: ['func'],
    },
    {
      name: 'leave',
      description: 'Emitted when leaving the page',
      inputValues: ['func'],
    },
  ];

  layoutColumns = {
    Name: 'Tag',
    Description: 'Description',
  };

  layouts: ShowcaseProperty[] = [
    {
      name: '<kirby-page>',
      description:
        'The `<kirby-page>` is a layout container for a Kirby page. There should only be one `<kirby-page>` layout container per page.',
    },
    {
      name: '<kirby-page-content>',
      description:
        'The `<kirby-page-content>` layout can be used as a convenient wrapper for page content. For more advanced scenarios or when used with `<ng-container>` the `*kirbyPageContent` directive can be applied instead.',
    },
    {
      name: '<kirby-page-actions *kirbyPageActions>',
      description:
        'The `<kirby-page-actions *kirbyPageActions>` layout can be used as a convenient wrapper for page actions. The actions inside are declared through regular Kirby buttons: `<button kirby-button>`. Always apply the `*kirbyPageActions` directive to the action buttons host element to ensure the actions are shown in the toolbar. The `*kirbyPageActions` directive can also be used for more advanced action scenarios or when used with `<ng-container>`.',
    },
  ];

  directiveColumns = {
    Name: 'Name',
    Description: 'Description',
    Type: '(Optional) Configuration',
  };

  directives: ShowcaseProperty[] = [
    {
      name: '*kirbyPageTitle',
      description:
        'The `*kirbyPageTitle` directive can be applied to any host or container element which will then be shown at the top of the page. For fixed titles use the `*kirbyPageToolbarTitle` directive instead.',
    },
    {
      name: '*kirbyPageToolbarTitle',
      description:
        'The `*kirbyPageToolbarTitle` directive can be applied to any host or container element as an alternative toolbar title to be shown instead of the page title. The element will be shown in the toolbar when the page is scrolled below the title. If no page title is specified the toolbar title will be fixed.',
    },
    {
      name: '*kirbyPageActions',
      description:
        'The `*kirbyPageActions` directive can be applied to any host or container element which will then be shown at the top of the page. The default configuration `{sticky: true}` makes the host element stick in the toolbar when the page is scrolled below the title. To avoid this it can be configured with `{sticky: false}` instead. When configured with `{fixed: true}` the element will be fixed and only shown in the toolbar.',
      inputValues: ['{sticky: boolean}', '{fixed: boolean}'],
      defaultValue: '{sticky: true}',
    },
    {
      name: '*kirbyPageContent',
      description:
        'The `kirbyPageContent` directive can be applied to any host or container element which will then be rendered as the content of the page. When configured with `{fixed: true}` the element will be fixed when scrolling the page. An example use case for this could be a Floating Action Button.',
      inputValues: ['{fixed: boolean}'],
    },
  ];

  cssColumns = {
    Name: 'Name',
    Description: 'Description',
    Type: 'Type',
    Default: 'Default',
  };

  cssProperties: ShowcaseProperty[] = [
    {
      name: '--kirby-page-title-margin-bottom',
      description: 'Spacing between page title and page content.',
      defaultValue: `size('xl')`,
      inputValues: ['unit'],
    },
  ];
}
