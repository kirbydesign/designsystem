import { Component } from '@angular/core';
import { SlideModule } from '@kirbydesign/designsystem/slide';
import { CardModule } from '@kirbydesign/designsystem/card';

const config = {
  selector: 'cookbook-slides-height-example',
  template: `<kirby-slides [slides]="slides" title="Title" [showNavigation]="true">
  <kirby-card *kirbySlide="let slide; let i = index" slideStretchHeight [hasPadding]="true">
    <kirby-card-header [title]="slide.title" [subtitle]="slide.subtitle"></kirby-card-header>
    <div class="card-content">
      {{ slide.cardContent }}
    </div>
  </kirby-card>
</kirby-slides>`,
};

@Component({
  styleUrls: ['./_shared.scss'],
  selector: config.selector,
  template: config.template,

  imports: [SlideModule, CardModule],
})
export class SlidesHeightExampleComponent {
  template = config.template;
  lorem =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus leo quis libero posuere auctor. Quisque ornare lectus finibus tellus sollicitudin, et blandit quam semper. Ut sed lacus eget dui blandit consequat. Nam commodo sit amet augue vel dapibus. Mauris tincidunt nulla eget porttitor euismod. Ut at massa massa. Curabitur suscipit ullamcorper felis, vitae tincidunt eros varius in. Duis et tellus eu turpis varius dictum. Mauris mattis posuere ligula nec pharetra. Vestibulum a augue at nulla elementum fringilla. Duis vehicula finibus turpis, vel dignissim magna ullamcorper vitae. Nam vel elit orci.';

  randomIntegerBetween = (max, min) => Math.floor(Math.random() * (max - min + 1) + min);

  slides = [...Array(9).keys()].map((number) => ({
    title: `Slide ${number + 1}`,
    subtitle: `Subtitle ${number + 1}`,
    cardContent: this.lorem.split(' ').slice(0, this.randomIntegerBetween(6, 12)).join(' '),
  }));
}
