import { Component } from '@angular/core';
import { KirbySwiperOptions, SelectedSlide, SlideModule } from '@kirbydesign/designsystem/slide';
import { ToastConfig, ToastController } from '@kirbydesign/designsystem/toast';
import { CardModule } from '@kirbydesign/designsystem/card';
import { ButtonComponent } from '@kirbydesign/designsystem/button';

const config = {
  selector: 'cookbook-slides-advanced-example',
  template: `<kirby-slides
  [slidesOptions]="config"
  [slides]="slides"
  [title]="'Title'" 
  [showNavigation]="true"
  (slideChange)="getDataFromActiveSlide($event)"
  #slidesInstance
>

  <kirby-card *kirbySlide="let slide; let i = index" [hasPadding]="true">
    <kirby-card-header [title]="slide.title" [subtitle]="slide.subtitle"></kirby-card-header>
    <div>{{ slide.cardContent }}</div>
  </kirby-card>
  <button kirby-button attentionLevel="3" size="xs" (click)="showAll()">See all</button>
</kirby-slides>

<button
  kirby-button
  (click)="slidesInstance.slideTo(3)"
  style="display: block; margin: 24px auto 0"
>
  Activate slide no. 4
</button>`,
};

@Component({
  styleUrls: ['./_shared.scss', '../../_examples.shared.scss'],
  selector: config.selector,
  template: config.template,
  imports: [SlideModule, CardModule, ButtonComponent],
})
export class SlidesAdvancedExampleComponent {
  template = config.template;
  constructor(private toastController: ToastController) {}

  config: KirbySwiperOptions = {
    slidesPerView: 1.1,
    breakpoints: {
      768: {
        centeredSlides: false,
        slidesPerView: 2,
        slidesPerGroup: 1,
      },
    },
  };

  slides = [...Array(9).keys()].map((number) => ({
    title: `Slide ${number + 1}`,
    subtitle: `Subtitle ${number + 1}`,
    cardContent: `Lorem ipsum dolor sit amet consectetur adipisicing elit.`,
  }));

  getDataFromActiveSlide(selectedSlide: SelectedSlide) {
    const config: ToastConfig = {
      message: `Changed to ${selectedSlide.slide.title}`,
      messageType: 'success',
      durationInMs: 1000,
    };
    this.toastController.showToast(config);
  }

  showAll() {
    const config: ToastConfig = {
      message: `See all... (your handler here)`,
      messageType: 'success',
      durationInMs: 2000,
    };
    this.toastController.showToast(config);
  }
}
