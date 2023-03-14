import { Component } from '@angular/core';
import { HeaderWithActionGroupExampleComponent } from '~/app/examples/header-example/examples/action-group';
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
        'A number that describes that allowed amount of lines in the title before truncating the value.',
      type: ['number'],
      defaultValue: '2',
    },
  ];

  directiveColumns: ApiDescriptionPropertyColumns = {
    name: 'Name',
    description: 'Description',
  };
}
