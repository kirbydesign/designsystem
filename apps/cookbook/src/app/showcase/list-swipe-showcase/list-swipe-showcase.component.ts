import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';
import exampleHtml from '../../examples/list-swipe-example/list-swipe-example.component.html' with {
  loader: 'text',
};
import { ListSwipeExampleComponent } from '../../examples/list-swipe-example/list-swipe-example.component';
import { CodeViewerComponent } from '../../shared/code-viewer/code-viewer.component';
import { ApiDescriptionPropertiesComponent } from '../../shared/api-description/api-description-properties/api-description-properties.component';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-list-swipe-showcase',
  templateUrl: './list-swipe-showcase.component.html',
  imports: [
    ListSwipeExampleComponent,
    CodeViewerComponent,
    RouterLink,
    ApiDescriptionPropertiesComponent,
  ],
})
export class ListSwipeShowcaseComponent {
  exampleHtml = exampleHtml;

  properties: ApiDescriptionProperty[] = [
    {
      name: 'swipeActions',
      description: 'Swipe actions available for list items.',
      defaultValue: '[]',
      type: ['ListSwipeAction[]'],
    },
  ];
}
