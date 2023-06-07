import { Component } from '@angular/core';
import { KirbySwiperOptions, SelectedSlide } from '@kirbydesign/designsystem/slide';
import { ToastConfig, ToastController } from '@kirbydesign/designsystem/toast';

@Component({
  selector: 'cookbook-slides-example',
  templateUrl: './slides-simple-example.component.html',
})
export class SlidesSimpleExampleComponent {
  constructor(private toastController: ToastController) {}

  config: KirbySwiperOptions = {
    slidesPerView: 1.2,
    centeredSlides: true,
    slidesPerGroup: 1,
    breakpoints: {
      768: {
        centeredSlides: false,
        slidesPerView: 3,
        slidesPerGroup: 3,
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
}
