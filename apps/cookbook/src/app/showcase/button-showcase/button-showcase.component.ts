import { Component } from '@angular/core';

import { DividerComponent } from '@kirbydesign/designsystem/divider';
import { RouterLink } from '@angular/router';
import { ExampleViewerComponent } from '../../shared/example-viewer/example-viewer.component';
import { ButtonExampleDefaultComponent } from '../../examples/button-example/examples/default';
import { ButtonExampleAttentionLevelComponent } from '../../examples/button-example/examples/attention-level';
import { ButtonExampleSizesComponent } from '../../examples/button-example/examples/sizes';
import { ButtonExampleBlockComponent } from '../../examples/button-example/examples/block';
import { ButtonExampleIconsComponent } from '../../examples/button-example/examples/icons';
import { ButtonExampleIconOnlyComponent } from '../../examples/button-example/examples/icon-only';
import { ButtonExampleUndecoratedComponent } from '../../examples/button-example/examples/undecorated';
import { ButtonExampleDisabledComponent } from '../../examples/button-example/examples/disabled';
import { ButtonExampleAriaDisabledComponent } from '../../examples/button-example/examples/aria-disabled';
import { ButtonExampleLinkComponent } from '../../examples/button-example/examples/link';
import { ApiDescriptionPropertiesComponent } from '../../shared/api-description/api-description-properties/api-description-properties.component';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-button-showcase',
  templateUrl: './button-showcase.component.html',
  styleUrls: ['./button-showcase.component.scss'],
  imports: [
    DividerComponent,
    ExampleViewerComponent,
    ButtonExampleDefaultComponent,
    ButtonExampleAttentionLevelComponent,
    ButtonExampleSizesComponent,
    ButtonExampleBlockComponent,
    ButtonExampleIconsComponent,
    RouterLink,
    ButtonExampleIconOnlyComponent,
    ButtonExampleUndecoratedComponent,
    ButtonExampleDisabledComponent,
    ButtonExampleAriaDisabledComponent,
    ButtonExampleLinkComponent,
    ApiDescriptionPropertiesComponent,
  ],
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
