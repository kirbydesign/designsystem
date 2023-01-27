import { Component } from '@angular/core';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-header-showcase',
  templateUrl: './header-showcase.component.html',
  preserveWhitespaces: true,
})
export class HeaderShowcaseComponent {
  properties: ApiDescriptionProperty[] = [
    {
      name: 'title',
      description: 'The title of the alert',
      type: ['string | Observable<string>'],
    },
    {
      name: 'message',
      description:
        "(Optional) The message shown under the title (or icon if specified). Use '\\n' for newline.",
      type: ['string | Observable<string>'],
    },
    {
      name: 'icon',
      description: '(Optional) Icon to be shown below the title',
      type: ['{ name: string }', '{ name: string, themeColor: string }'],
    },
    {
      name: 'okBtn',
      description:
        '(Optional) Defines the text that will appear on the OK button and if it should be destructive',
      defaultValue: 'OK',
      type: ['string', '{ text: string, isDestructive: boolean }'],
    },
    {
      name: 'cancelBtn',
      description:
        '(Optional) The text that will appear on the cancel button. If not defined the cancel button will not be shown.',
      type: ['string'],
    },
  ];
}
