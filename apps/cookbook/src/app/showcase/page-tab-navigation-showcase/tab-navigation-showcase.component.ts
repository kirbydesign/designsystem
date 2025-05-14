import { Component } from '@angular/core';

import { DividerComponent } from '@kirbydesign/designsystem/divider';
import { ExampleViewerComponent } from '../../shared/example-viewer/example-viewer.component';
import { IphoneComponent } from '../../iphone/iphone.component';
import { ApiDescriptionPropertiesComponent } from '../../shared/api-description/api-description-properties/api-description-properties.component';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';
import { TabNavigationExampleComponent } from '~/app/examples/tab-navigation-example/tab-navigation-example.component';

@Component({
  selector: 'cookbook-tab-navigation-showcase',
  templateUrl: './tab-navigation-showcase.component.html',
  styleUrls: ['./tab-navigation-showcase.component.scss'],
  preserveWhitespaces: true,
  imports: [
    ExampleViewerComponent,
    IphoneComponent,
    DividerComponent,
    ApiDescriptionPropertiesComponent,
  ],
})
export class TabNavigationShowcaseComponent {
  pageWithTabNavigationTemplate: string = TabNavigationExampleComponent.template;

  tabNavProperties: ApiDescriptionProperty[] = [
    {
      name: 'selectedIndex',
      description:
        'The index of the selected tab navigation item. Can be defined as a two-way-binding.',
      defaultValue: 'undefined',
      type: ['number'],
    },
  ];

  tabNavItemProperties: ApiDescriptionProperty[] = [
    {
      name: 'label',
      description: 'The label text displayed on the tab navigation item.',
      defaultValue: '',
      type: ['string'],
    },
    {
      name: 'truncate',
      description:
        'By default label text will be truncated to maximize the amount of visible tab navigation items. Set to `false` to disable truncation.',
      defaultValue: 'true',
      type: ['boolean'],
    },
  ];
}
