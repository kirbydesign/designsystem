import { Component } from '@angular/core';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-item-sliding-showcase',
  templateUrl: './item-sliding-showcase.component.html',
  styleUrls: ['./item-sliding-showcase.component.scss'],
})
export class ItemSlidingShowcaseComponent {
  _inputPropertiesApiDescription: ApiDescriptionProperty[] = [
    {
      name: 'swipeActions',
      description:
        '(Required) A list of swipe actions that is used to configure the buttons that is revealed when the item is swiped. See the below description of the SwipeAction object for more info on configuration.',
      type: ['SwipeAction[]'],
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
      description: '(Required) The text the swipe action button should be rendered with.',
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
      description: 'If true will cause the swipe action button to not be rendered.',
      type: ['boolean'],
      defaultValue: 'false',
    },
  ];
}
