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
      name: 'expand',
      description:
        'If the button needs to expand to full width of its parent container, then use expand.',
      defaultValue: 'null',
      type: ['block'],
    },
    {
      name: 'size',
      description:
        'Sets the size of the button. The touch area will always be a minimum of 44px by 44px. If buttons are smaller than this, the surrounding area will still be clickable, to preserve accessibility.',
      defaultValue: 'md',
      type: ['xs', 'sm', 'md', 'lg'],
    },
  ];

  scrollTo(target: Element) {
    target.scrollIntoView({ behavior: 'smooth' });
    return false;
  }
}
