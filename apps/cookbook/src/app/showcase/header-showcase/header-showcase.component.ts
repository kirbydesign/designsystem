import { Component } from '@angular/core';
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
  properties: ApiDescriptionProperty[] = [
    {
      name: 'centered',
      description: 'A boolean that describe whether the header should be centered.',
      type: ['boolean'],
      defaultValue: 'false',
    },
    {
      name: 'titleMaxLines',
      description:
        'A number that describes that allowed amount of lines in the title before truncating the value.',
      type: ['number'],
      defaultValue: '2',
    },
  ];

  directiveColumns: ApiDescriptionPropertyColumns = {
    name: 'Name',
    description: 'Description',
  };

  directives: ApiDescriptionProperty[] = [
    {
      name: '*kirbyHeaderAvatar',
      description:
        'The `*kirbyHeaderAvatar` directive should be applied an kirby-avatar element which will then be shown in the header.',
    },
    {
      name: '*kirbyHeaderFlag',
      description:
        'The `*kirbyHeaderFlag` directive should be applied an kirby-flag element which will then be shown in the header.',
    },
    {
      name: '*kirbyHeaderTitle',
      description:
        'The `*kirbyHeaderTitle` directive should be applied an ng-container element or any host which will then be shown in the header. Your host or element will be rendered within a h1 or h4 element depnding on if the *kirbyHeaderValue directive is used.',
    },
    {
      name: '*kirbyHeaderValue',
      description:
        'The `*kirbyHeaderValue` directive should be applied an ng-container element or any host which will then be shown in the header. Your host or element will be rendered within a h1 you below the *kirbyHeaderTitle.',
    },
    {
      name: '*kirbyHeaderSubtitle1',
      description:
        'The `*kirbyHeaderSubtitle1` directive should be applied an ng-container element or any host which will then be shown in the header.',
      type: ['{fixed: boolean}'],
    },
    {
      name: '*kirbyHeaderSubtitle2',
      description:
        'The `*kirbyHeaderSubtitle2` directive should be applied an ng-container element or any host which will then be shown in the header.',
    },
    {
      name: '*kirbyHeaderCustomSection',
      description:
        'The `*kirbyHeaderCustomSection` directive should be applied an ng-container element or any host which will then be shown in the header.',
    },
    {
      name: '*kirbyHeaderActions',
      description:
        'The `*kirbyHeaderActions` directive should be applied an element or any host which will then be shown in the header.',
    },
  ];
}
