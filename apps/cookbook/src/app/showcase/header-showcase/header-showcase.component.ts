import { Component } from '@angular/core';

import { HeaderWithActionGroupExampleComponent } from '~/app/examples/header-example/examples/action-group';
import { HeaderWithCustomActionsExampleComponent } from '~/app/examples/header-example/examples/custom-actions';
import { HeaderWithInteractiveTitleExampleComponent } from '~/app/examples/header-example/examples/interactive-title';
import { ApiDescriptionEvent } from '~/app/shared/api-description/api-description-events/api-description-events.component';
import {
  ApiDescriptionProperty,
  ApiDescriptionPropertyColumns,
} from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-header-showcase',
  templateUrl: './header-showcase.component.html',
  styleUrls: ['./header-showcase.component.scss'],
  preserveWhitespaces: true,
})
export class HeaderShowcaseComponent {
  actionGroupTemplate: string = HeaderWithActionGroupExampleComponent.template;
  customActionsTemplate: string = HeaderWithCustomActionsExampleComponent.template;
  interactiveTitleTemplate: string = HeaderWithInteractiveTitleExampleComponent.template;
  interactiveTitleSnippet: string = HeaderWithInteractiveTitleExampleComponent.codeSnippet;

  properties: ApiDescriptionProperty[] = [
    {
      name: 'title',
      description: 'A string that is used as the title.',
      type: ['string'],
      defaultValue: '',
    },
    {
      name: 'value',
      description: 'A string that is used as the value.',
      type: ['string'],
      defaultValue: '',
    },
    {
      name: 'valueUnit',
      description: 'A string that is used to describe the units of the value.',
      type: ['string'],
      defaultValue: '',
    },
    {
      name: 'subtitle1',
      description: 'A string that is used as the first subtitle.',
      type: ['string'],
      defaultValue: '',
    },
    {
      name: 'subtitle2',
      description: 'A string that is used as the second subtitle.',
      type: ['string'],
      defaultValue: '',
    },
    {
      name: 'centered',
      description: 'A boolean that describe whether the header should be centered.',
      type: ['boolean'],
      defaultValue: 'false',
    },
    {
      name: 'titleMaxLines',
      description:
        'The allowed number of lines in the title. The text will be scaled from h1 -> h3 to fit and otherwise truncated.',
      type: ['number'],
      defaultValue: '',
    },
  ];

  directiveColumns: ApiDescriptionPropertyColumns = {
    name: 'Name',
    description: 'Description',
  };

  directives: ApiDescriptionProperty[] = [
    {
      name: '*kirbyHeaderActions',
      description:
        'The `*kirbyHeaderActions` directive should be applied to the host or container element (e.g. `kirby-action-group` or an `ng-container`) for the page and header components to render the actions in both locations',
    },
    {
      name: '*kirbyHeaderCustomSection',
      description:
        'The `*kirbyHeaderCustomSection` directive can be applied to any host or container element which will then be shown just below the title (and any subtitles) at the top of the page.',
    },
    {
      name: '*kirbyHeaderTitleActionIcon',
      description:
        'For an interactive title (i.e. handling the `titleClick` event) the `*kirbyHeaderTitleActionIcon` directive can be applied to a `kirby-icon` element which will then be shown next to the title element for affordance.',
    },
  ];

  events: ApiDescriptionEvent[] = [
    {
      name: 'titleClick',
      description:
        'Emitted when the title element is clicked (in either the header or the toolbar).',
      signature: 'EventEmitter<PointerEvent>',
    },
  ];

  scrollTo(target: Element) {
    target.scrollIntoView({ behavior: 'smooth' });
    return false;
  }
}
