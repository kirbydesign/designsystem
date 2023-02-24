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
        'The `*kirbyHeaderTitle` directive can be applied an ng-container element or any host as an alternative to passing the title property that provides more flexibility.',
    },
    {
      name: '*kirbyHeaderValue',
      description:
        'The `*kirbyHeaderValue` directive can be applied an ng-container element or any host as an alternative to passing the value property that provides more flexibility.',
    },
    {
      name: '*kirbyHeaderSubtitle1',
      description:
        'The `*kirbyHeaderSubtitle1` directive can be applied an ng-container element or any host as an alternative to passing the subtitle1 property that provides more flexibility.',
      type: ['{fixed: boolean}'],
    },
    {
      name: '*kirbyHeaderSubtitle2',
      description:
        'The `*kirbyHeaderSubtitle2` directive can be applied an ng-container element or any host as an alternative to passing the subtitle2 property that provides more flexibility.',
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
