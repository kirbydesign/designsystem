import { Component } from '@angular/core';
import { CodeViewerComponent } from '../../shared/code-viewer/code-viewer.component';
import { ApiDescriptionPropertiesComponent } from '../../shared/api-description/api-description-properties/api-description-properties.component';
import {
  ApiDescriptionMethod,
  ApiDescriptionMethodsComponent,
} from '../../shared/api-description/api-description-methods/api-description-methods.component';
import { ExampleViewerComponent } from '~/app/shared/example-viewer/example-viewer.component';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';
import { ToastExampleDefaultComponent } from '~/app/examples/toast-example/examples/default';
import { ToastExampleDurationComponent } from '~/app/examples/toast-example/examples/duration';
import { ToastExampleDismissComponent } from '~/app/examples/toast-example/examples/dismiss';
import { ImportViewerComponent } from '~/app/shared/import-code-viewer/import-code-viewer.component';

@Component({
  selector: 'cookbook-toast-showcase',
  templateUrl: './toast-showcase.component.html',
  styleUrl: './toast-showcase.component.scss',
  imports: [
    CodeViewerComponent,
    ExampleViewerComponent,
    ApiDescriptionPropertiesComponent,
    ApiDescriptionMethodsComponent,
    ToastExampleDefaultComponent,
    ToastExampleDurationComponent,
    ToastExampleDismissComponent,
    ImportViewerComponent,
  ],
})
export class ToastShowcaseComponent {
  methods: ApiDescriptionMethod[] = [
    {
      name: 'showToast',
      description:
        'Shows a toast with the given configuration. Returns a Promise that resolves to an Overlay object which can be used to dismiss the toast programmatically.',
      signature: 'showToast(config: ToastConfig, onCloseToast?: () => void): Promise<Overlay>',
    },
  ];

  properties: ApiDescriptionProperty[] = [
    {
      name: 'message',
      description: 'Sets the message for the toast.',
      defaultValue: 'null',
      type: ['string'],
    },
    {
      name: 'messageType',
      description:
        "Message type defines which color the toast will have. There are two different toast types: 'success' (green) and 'warning' (yellow).",
      defaultValue: 'success',
      type: ['success', 'warning'],
    },
    {
      name: 'durationInMs',
      description:
        'Duration in milliseconds before the toast dismisses automatically. Set to 0 to keep the toast visible until dismissed programmatically.',
      defaultValue: '4000',
      type: ['number'],
    },
  ];

  overlayProperties: ApiDescriptionProperty[] = [
    {
      name: 'dismiss',
      description:
        'Dismisses the toast. Returns a Promise that resolves when the toast has been dismissed.',
      type: ['(data?: any) => Promise<boolean>'],
    },
    {
      name: 'onWillDismiss',
      description: 'A Promise that resolves when the toast is about to be dismissed.',
      type: ['Promise<OverlayEventDetail>'],
    },
    {
      name: 'onDidDismiss',
      description: 'A Promise that resolves when the toast has been dismissed.',
      type: ['Promise<OverlayEventDetail>'],
    },
  ];
}
