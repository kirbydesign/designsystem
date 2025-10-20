import { Component } from '@angular/core';
import { SlideDirective, SlidesComponent } from '@kirbydesign/designsystem/slide';
import { CardComponent, CardHeaderComponent } from '@kirbydesign/designsystem/card';

const config = {
  selector: 'cookbook-slides-custom-heading-example',
  template: `<kirby-slides [slides]="slides" [showNavigation]="true">    
  <h3>Custom heading</h3>
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
  imports: [SlidesComponent, SlideDirective, CardComponent, CardHeaderComponent],
})
export class SlidesCustomHeadingExampleComponent {
  template = config.template;
  slides = [...Array(9).keys()].map((number) => ({
    title: `Slide ${number + 1}`,
    subtitle: `Subtitle ${number + 1}`,
    cardContent: `Lorem ipsum dolor sit amet consectetur adipisicing elit.`,
  }));
}
