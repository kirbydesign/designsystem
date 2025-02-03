import { Component } from '@angular/core';
import { FlagComponent } from '@kirbydesign/designsystem/flag';
import { RouterLink } from '@angular/router';
import { ExampleViewerComponent } from '../../shared/example-viewer/example-viewer.component';
import { EmptyStateMessageTypesExampleComponent } from '../../examples/empty-state-example/examples/message-types';
import { EmptyStateSimpleExampleComponent } from '../../examples/empty-state-example/examples/simple';
import { EmptyStateButtonsExampleComponent } from '../../examples/empty-state-example/examples/buttons';
import { ApiDescriptionPropertiesComponent } from '../../shared/api-description/api-description-properties/api-description-properties.component';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-empty-state-showcase',
  templateUrl: './empty-state-showcase.component.html',
  styleUrl: './empty-state-showcase.component.scss',
  imports: [
    FlagComponent,
    ExampleViewerComponent,
    EmptyStateMessageTypesExampleComponent,
    EmptyStateSimpleExampleComponent,
    EmptyStateButtonsExampleComponent,
    RouterLink,
    ApiDescriptionPropertiesComponent,
  ],
})
export class EmptyStateShowcaseComponent {
  properties: ApiDescriptionProperty[] = [
    {
      name: 'iconName',
      description: 'Name of the icon (see icons).',
      defaultValue: 'null',
      type: ['string'],
    },
    {
      name: 'title',
      description: 'The title.',
      defaultValue: 'null',
      type: ['string'],
    },
    {
      name: 'subtitle',
      description:
        "The text beneath the title. Use '\\n' for newline if the text comes from an expression and '&#10;' if the text is written directly in the template.",
      defaultValue: 'null',
      type: ['string'],
    },
    {
      name: 'themeColor',
      description: 'Sets which color the empty state should use from the theme palette.',
      defaultValue: 'null',
      type: [
        'primary',
        'secondary',
        'tertiary',
        'success',
        'warning',
        'danger',
        'light',
        'medium',
        'dark',
      ],
    },
  ];
}
