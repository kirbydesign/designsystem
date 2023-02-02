import { Component } from '@angular/core';
import { ApiDescriptionEvent } from '~/app/shared/api-description/api-description-events/api-description-events.component';
import { ApiDescriptionProperty } from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

@Component({
  selector: 'cookbook-slide-showcase',
  templateUrl: './slides-showcase.component.html',
  preserveWhitespaces: true,
})
export class SlidesShowcaseComponent {
  properties: ApiDescriptionProperty[] = [
    {
      name: 'slidesOptions',
      description:
        'Configuration object for ion-slides. View documentation at: [https://ionicframework.com/docs/v3/api/components/slides/Slides/#input-properties] for available props',
      defaultValue: '',
      type: ['object'],
    },
    {
      name: 'slides',
      description: 'Object array holding the data to be shown',
      defaultValue: '',
      type: ['DataArray'],
    },
    {
      name: 'activeSlideIndex',
      description: 'The index of the active slide',
      defaultValue: '0',
      type: ['number'],
    },
  ];
  events: ApiDescriptionEvent[] = [
    {
      name: 'selectedSlide',
      description: 'Emits active slide´s data and index',
      signature: 'func',
    },
  ];
}
