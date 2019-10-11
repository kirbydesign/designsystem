import { Component } from '@angular/core';

import { ShowcaseProperty } from '~/app/shared/showcase-properties/showcase-property';
import { AlertExampleComponent } from '~/app/examples/alert-example/alert-example.component';

@Component({
  selector: 'kirby-alert-showcase',
  templateUrl: './alert-showcase.component.html',
  preserveWhitespaces: true,
})
export class AlertShowcaseComponent {
  exampleConfiguration: string = AlertExampleComponent.alertConfigWithIcon;
  properties: ShowcaseProperty[] = [
    {
      name: 'title',
      description: 'The title of the alert',
      inputValues: ['string'],
    },
    {
      name: 'message',
      description: '(Optional) The message shown under the title (or icon if specified)',
      inputValues: ['string'],
    },
    {
      name: 'icon',
      description: '(Optional) Icon to be shown below the title',
      inputValues: ['{ name: string }', '{ name: string, themeColor: string }'],
    },
    {
      name: 'okBtn',
      description:
        '(Optional) Defines the text that will appear on the OK button and if it should be destructive',
      defaultValue: 'OK',
      inputValues: ['string', '{ text: string, isDestructive: boolean }'],
    },
    {
      name: 'cancelBtn',
      description:
        '(Optional) The text that will appear on the cancel button. If not defined the cancel button will not be shown.',
      inputValues: ['string'],
    },
  ];
}
