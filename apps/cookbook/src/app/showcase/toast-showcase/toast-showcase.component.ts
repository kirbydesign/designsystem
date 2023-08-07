import { Component } from '@angular/core';
import exampleHtml from '../../examples/toast-example/toast-example.component.html?raw';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-toast-showcase',
  templateUrl: './toast-showcase.component.html',
})
export class ToastShowcaseComponent {
  exampleHtml = exampleHtml;
  properties: ApiDescriptionProperty[] = [
    {
      name: 'message',
      description: 'Sets the message for the toast',
      defaultValue: 'null',
      type: ['string'],
    },
    {
      name: 'messageType',
      description:
        "Message type defines which color the toast will have. There are two different toast types: 'success' (green) and 'warning' (yellow)",
      defaultValue: 'success',
      type: ['success', 'warning'],
    },
    {
      name: 'durationInMs',
      description: '(Optional) Duration in milliseconds before the toast dismisses automatically.',
      defaultValue: '4000',
      type: ['number'],
    },
  ];
}
