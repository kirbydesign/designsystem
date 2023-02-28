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
      name: 'kirbyHeaderCustomTitle',
      description:
        'The `kirbyHeaderCustomTitle` directive can be applied to an element as an alternative to passing the title property. Using this method you will gain more control over the content.',
    },
    {
      name: 'kirbyHeaderCustomValue',
      description:
        'The `kirbyHeaderCustomValue` directive can be applied to an element as an alternative to passing the value property. Using this method you will gain more control over the content.',
    },
    {
      name: 'kirbyHeaderCustomSection',
      description:
        'The `kirbyHeaderCustomSection` directive can be used to add a custom section to the header. This can be used display custom ui below the header.',
    },
    {
      name: 'kirbyHeaderActions',
      description:
        'The `kirbyHeaderActions` directive can be used to render actions. The placement of the actions is resposnive and will have different layouts depending on the viewport size.',
    },
  ];
}
