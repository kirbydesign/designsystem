import { Component } from '@angular/core';
import { CardModule } from '@kirbydesign/designsystem/card';
import { ExampleViewerComponent } from '../../shared/example-viewer/example-viewer.component';
import { ItemSlidingSimpleExampleComponent } from '../../examples/item-sliding-example/examples/item-sliding-simple-example.component';
import { ItemSlidingConditionalExampleComponent } from '../../examples/item-sliding-example/examples/item-sliding-conditional-example.component';
import { ApiDescriptionPropertiesComponent } from '../../shared/api-description/api-description-properties/api-description-properties.component';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-item-sliding-showcase',
  templateUrl: './item-sliding-showcase.component.html',
  imports: [
    CardModule,
    ExampleViewerComponent,
    ItemSlidingSimpleExampleComponent,
    ItemSlidingConditionalExampleComponent,
    ApiDescriptionPropertiesComponent,
  ],
})
export class ItemSlidingShowcaseComponent {
  _cardHasPadding = true;

  _inputPropertiesApiDescription: ApiDescriptionProperty[] = [
    {
      name: 'swipeActions',
      description:
        '(Required) A list of swipe actions that are used to configure the buttons which are revealed when the item is swiped. See the below description of the ItemSwipeAction object for more info on configuration.',
      type: ['ItemSwipeAction[]'],
      defaultValue: 'undefined',
    },
    {
      name: 'side',
      description: 'The side the swipe actions should be displayed in.',
      type: ['"left"', '"right"'],
      defaultValue: '"left"',
    },
  ];

  _swipeActionApiDescription: ApiDescriptionProperty[] = [
    {
      name: 'title',
      description: '(Required) The text the swipe action button should be displayed with.',
      type: ['string'],
      defaultValue: 'undefined',
    },
    {
      name: 'onSelected',
      description:
        '(Required) Callback function that is triggered when the swipe action button is selected.',
      type: ['() => void'],
      defaultValue: 'undefined',
    },
    {
      name: 'icon',
      description:
        'Name of icon the swipe action button should be displayed with. Note: Does not currently support custom icons. See the following showcase page for icons: https://cookbook.kirby.design/#/home/showcase/icon',
      type: ['string'],
      defaultValue: 'undefined',
    },
    {
      name: 'type',
      description: 'The type determines the styling of the button.',
      type: ['"danger"', '"warning"', '"success"'],
      defaultValue: 'undefined',
    },
    {
      name: 'isDisabled',
      description: 'If true will cause the swipe action button to not be displayed.',
      type: ['boolean'],
      defaultValue: 'false',
    },
  ];
}
