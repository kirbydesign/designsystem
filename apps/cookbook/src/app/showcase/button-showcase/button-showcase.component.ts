import { Component } from '@angular/core';
import exampleHtml from '../../examples/button-example/button-example.component.html?raw';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-button-showcase',
  templateUrl: './button-showcase.component.html',
  styleUrls: ['./button-showcase.component.scss'],
})
export class ButtonShowcaseComponent {
  exampleHtml = exampleHtml;
  properties: ApiDescriptionProperty[] = [
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
    {
      name: 'attentionLevel',
      description:
        'Sets the attention level for the button. Button color will be updated automatically depending on host color.',
      defaultValue: '1',
      type: ['1', '2', '3'],
    },
    {
      name: 'isFloating',
      description:
        '(Optional) Determine if the button is going to be a Floating Action Button (FAB). Please note: FABs have an elevation of z8 by default. FABs have only an icon and no text. FABs always have a size of 64x64.',
      defaultValue: 'false',
      type: ['boolean'],
    },
  ];

  scrollTo(target: Element) {
    target.scrollIntoView({ behavior: 'smooth' });
    return false;
  }
}
