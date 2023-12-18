import { Component } from '@angular/core';
import exampleHtml from '../../examples/toggle-example/toggle-example.component.html?raw';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-toggle-showcase',
  templateUrl: './toggle-showcase.component.html',
  styleUrls: ['./toggle-showcase.component.scss'],
})
export class ToggleShowcaseComponent {
  exampleHtml = exampleHtml;
  properties: ApiDescriptionProperty[] = [
    {
      name: 'checked',
      description: 'If true, the toggle is selected.',
      defaultValue: 'false',
      type: ['true', 'false'],
    },
    {
      name: 'disabled',
      description: 'If true, the toggle is disabled.',
      defaultValue: 'false',
      type: ['true', 'false'],
    },
    {
      name: 'checkedChange',
      description: 'Emits the checked state of the toggle on change (true | false).',
      defaultValue: '',
      type: ['event'],
    },
  ];
}
