import { Component } from '@angular/core';
import { HeaderWithActionGroupExampleComponent } from '~/app/examples/header-example/examples/action-group';
import { HeaderWithCustomActionsExampleComponent } from '~/app/examples/header-example/examples/custom-actions';
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

  scrollTo(target: Element) {
    target.scrollIntoView({ behavior: 'smooth' });
    return false;
  }
}
