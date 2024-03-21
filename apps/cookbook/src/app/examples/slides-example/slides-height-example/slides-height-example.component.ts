import { Component } from '@angular/core';

@Component({
  styleUrls: ['../slides-example.shared.scss'],
  templateUrl: './slides-height-example.component.html',
})
export class SlidesHeightExampleComponent {
  lorem =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus leo quis libero posuere auctor. Quisque ornare lectus finibus tellus sollicitudin, et blandit quam semper. Ut sed lacus eget dui blandit consequat. Nam commodo sit amet augue vel dapibus. Mauris tincidunt nulla eget porttitor euismod. Ut at massa massa. Curabitur suscipit ullamcorper felis, vitae tincidunt eros varius in. Duis et tellus eu turpis varius dictum. Mauris mattis posuere ligula nec pharetra. Vestibulum a augue at nulla elementum fringilla. Duis vehicula finibus turpis, vel dignissim magna ullamcorper vitae. Nam vel elit orci.';

  randomIntegerBetween = (max, min) => Math.floor(Math.random() * (max - min + 1) + min);

  slides = [...Array(9).keys()].map((number) => ({
    title: `Slide ${number + 1}`,
    subtitle: `Subtitle ${number + 1}`,
    cardContent: this.lorem.split(' ').slice(0, this.randomIntegerBetween(6, 12)).join(' '),
  }));
}
