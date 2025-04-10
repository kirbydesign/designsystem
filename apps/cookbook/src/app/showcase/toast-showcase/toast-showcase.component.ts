import { Component } from '@angular/core';
import { CodeViewerComponent } from '../../shared/code-viewer/code-viewer.component';
import { ApiDescriptionPropertiesComponent } from '../../shared/api-description/api-description-properties/api-description-properties.component';
import { ExampleViewerComponent } from '~/app/shared/example-viewer/example-viewer.component';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';
import { IphoneComponent } from '~/app/iphone/iphone.component';
import { ToastExampleComponent } from '~/app/examples/toast-example/toast-example.component';

@Component({
  selector: 'cookbook-toast-showcase',
  templateUrl: './toast-showcase.component.html',
  styleUrl: './toast-showcase.component.scss',
  imports: [
    ToastExampleComponent,
    CodeViewerComponent,
    ExampleViewerComponent,
    ApiDescriptionPropertiesComponent,
    IphoneComponent,
  ],
})
export class ToastShowcaseComponent {
  toastExample = ToastExampleComponent;

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
