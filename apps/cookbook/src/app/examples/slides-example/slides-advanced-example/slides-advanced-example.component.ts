import { Component } from '@angular/core';
import { KirbySwiperOptions, SelectedSlide } from '@kirbydesign/designsystem/slide';
import { ToastConfig, ToastController } from '@kirbydesign/designsystem/toast';

@Component({
  styleUrls: ['../slides-example.shared.scss'],
  templateUrl: './slides-advanced-example.component.html',
})
export class SlidesAdvancedExampleComponent {
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
