import { Component } from '@angular/core';
import { SlideModule } from '@kirbydesign/designsystem/slide';
import { CardModule } from '@kirbydesign/designsystem/card';

const config = {
  selector: 'cookbook-slides-custom-heading-example',
  template: `<kirby-slides [slides]="slides" title="Title" [showNavigation]="true">    
  <h4 class="kirby-text-medium">Custom heading</h4>
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
export class SlidesCustomHeadingExampleComponent {
  template = config.template;
  title = `Title`;
  slides = [...Array(9).keys()].map((number) => ({
    title: `Slide ${number + 1}`,
    subtitle: `Subtitle ${number + 1}`,
    cardContent: `Lorem ipsum dolor sit amet consectetur adipisicing elit.`,
  }));
}
