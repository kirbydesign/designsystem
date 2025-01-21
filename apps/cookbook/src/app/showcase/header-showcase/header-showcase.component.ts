import { Component } from '@angular/core';

import { ExampleViewerComponent } from '../../shared/example-viewer/example-viewer.component';
import { HeaderExampleDefaultComponent } from '../../examples/header-example/examples/default';
import { HeaderExampleSubtitleListComponent } from '../../examples/header-example/examples/subtitles';
import { HeaderExampleFlagComponent } from '../../examples/header-example/examples/flag';
import { HeaderExampleCustomFlagComponent } from '../../examples/header-example/examples/custom-flag';
import { HeaderExampleValueComponent } from '../../examples/header-example/examples/value';
import { HeaderExampleAvatarComponent } from '../../examples/header-example/examples/avatar';
import { HeaderExampleProgressCircleWithAvatarComponent } from '../../examples/header-example/examples/progress-circle-with-avatar';
import { HeaderExampleTitleScalingComponent } from '../../examples/header-example/examples/title-scaling';
import { IphoneComponent } from '../../iphone/iphone.component';
import { HeaderExampleCustomSectionComponent } from '../../examples/header-example/examples/custom-section';
import { HeaderExampleCombinedComponent } from '../../examples/header-example/examples/combined';
import { ApiDescriptionPropertiesComponent } from '../../shared/api-description/api-description-properties/api-description-properties.component';
import { ApiDescriptionEventsComponent } from '../../shared/api-description/api-description-events/api-description-events.component';
import {
  ApiDescriptionProperty,
  ApiDescriptionPropertyColumns,
} from '~/app/shared/api-description/api-description-properties/api-description-properties.component';
import { ApiDescriptionEvent } from '~/app/shared/api-description/api-description-events/api-description-events.component';
import { HeaderWithInteractiveTitleExampleComponent } from '~/app/examples/header-example/examples/interactive-title';
import { HeaderWithCustomActionsExampleComponent } from '~/app/examples/header-example/examples/custom-actions';
import { HeaderWithEmphasizedActionGroupExampleComponent } from '~/app/examples/header-example/examples/emphasize-actions';
import { HeaderWithActionGroupExampleComponent } from '~/app/examples/header-example/examples/action-group';

@Component({
  selector: 'cookbook-header-showcase',
  templateUrl: './header-showcase.component.html',
  styleUrls: ['./header-showcase.component.scss'],
  preserveWhitespaces: true,
  imports: [
    ExampleViewerComponent,
    HeaderExampleDefaultComponent,
    HeaderExampleSubtitleListComponent,
    HeaderExampleFlagComponent,
    HeaderExampleCustomFlagComponent,
    HeaderExampleValueComponent,
    HeaderExampleAvatarComponent,
    HeaderExampleProgressCircleWithAvatarComponent,
    HeaderExampleTitleScalingComponent,
    IphoneComponent,
    HeaderExampleCustomSectionComponent,
    HeaderExampleCombinedComponent,
    ApiDescriptionPropertiesComponent,
    ApiDescriptionEventsComponent,
  ],
})
export class HeaderShowcaseComponent {
  actionGroupTemplate: string = HeaderWithActionGroupExampleComponent.template;
  emphasizedActionGroupTemplate: string = HeaderWithEmphasizedActionGroupExampleComponent.template;
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
    {
      name: 'emphasizeActions',
      description:
        'A boolean that describe whether to emphasize the action buttons—i.e. all buttons will be shown and not automatically collapse into a "more" menu. The buttons will also be visible under the title area on small screens. Keep in mind that this setting use more screen real estate than the default option.\n\n**Please note** With this setting enabled you should ensure the action buttons can fit on the screen—or collapse secondary actions into a "more" menu using the `visibleActions` property of kirby-action-group.',
      type: ['boolean'],
      defaultValue: 'false',
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
        'For an interactive title (i.e. handling the `titleClick` event) the `*kirbyHeaderTitleActionIcon` directive can be applied to a `kirby-icon` element which will then be shown next to the title element for affordance.\n\n**Please note: this only applies in key value scenarios.',
    },
    {
      name: '*kirbyHeaderCustomFlag',
      description:
        'For a custom flag to be shown in the flag section the `*kirbyHeaderCustomFlag` directive can be applied to any host or container element.\n\n**Please note: You should not have both a custom flag and kirby-flag present at the same time.',
    },
  ];

  events: ApiDescriptionEvent[] = [
    {
      name: 'titleClick',
      description:
        'Emitted when the title element is clicked (in either the header or the toolbar).\n\n**Please note: this only applies in key value scenarios.',
      signature: 'EventEmitter<PointerEvent>',
    },
  ];

  actionGroupProperties: ApiDescriptionProperty[] = [
    {
      name: 'visibleActions',
      description:
        'A number that controls how many action buttons are shown. Any additional buttons will be collapsed into a "more" menu.',
      type: ['number'],
      defaultValue: '',
    },
  ];

  scrollTo(target: Element) {
    target.scrollIntoView({ behavior: 'smooth' });
    return false;
  }
}
