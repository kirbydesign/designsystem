import { Component } from '@angular/core';

import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-button-showcase',
  templateUrl: './button-showcase.component.html',
  styleUrls: ['./button-showcase.component.scss'],
})
export class ButtonShowcaseComponent {
  properties: ApiDescriptionProperty[] = [
    {
      name: 'attentionLevel',
      description:
        'Sets the attention level for the button. Button color will be updated automatically depending on host color.',
      defaultValue: '1',
      type: ['1', '2', '3'],
    },
    {
      name: 'disabled',
      description: 'Disables the button.',
      defaultValue: '',
      type: ['boolean attribute'],
    },
    {
      name: 'expand',
      description:
        "When set to `block` the button will expand to full width of it's parent container.",
      defaultValue: 'undefined',
      type: ['block'],
    },
    {
      name: 'noDecoration',
      description: 'Renders the button without a background.',
      defaultValue: 'false',
      type: ['true', 'false'],
    },
    {
      name: 'size',
      description:
        'Sets the size of the button. The touch area will always be a minimum of 44px by 44px. If buttons are smaller than this, the surrounding area will still be clickable, to preserve accessibility.',
      defaultValue: 'md',
      type: ['xs', 'sm', 'md', 'lg'],
    },
    {
      name: 'showIconOnly',
      description:
        'Set to `true` if you need to include a text for the button in the markup but still want to render the button as icon only.',
      defaultValue: 'false',
      type: ['boolean'],
    },
  ];

  scrollTo(target: Element) {
    target.scrollIntoView({ behavior: 'smooth' });
    return false;
  }
}
