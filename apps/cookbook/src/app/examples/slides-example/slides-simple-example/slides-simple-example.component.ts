import { Component } from '@angular/core';
import { SelectedSlide } from '@kirbydesign/designsystem/slide';
import { ToastConfig, ToastController } from '@kirbydesign/designsystem/toast';

@Component({
  styleUrls: ['../slides-example.shared.scss'],
  templateUrl: './slides-simple-example.component.html',
})
export class SlidesSimpleExampleComponent {
  constructor(private toastController: ToastController) {}

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
