import { Component } from '@angular/core';
import { SelectedSlide } from '@kirbydesign/designsystem/slide';
import { ToastConfig, ToastController } from '@kirbydesign/designsystem/toast';
import { faker } from '@faker-js/faker';

@Component({
  styleUrls: ['../slides-example.shared.scss'],
  templateUrl: './slides-simple-example.component.html',
})
export class SlidesSimpleExampleComponent {
  constructor(private toastController: ToastController) {}

  stretch = false;

  slides = [...Array(9).keys()].map((number) => ({
    title: `Slide ${number + 1}`,
    subtitle: `Subtitle ${number + 1}`,
    cardContent: faker.lorem.lines({ min: 1, max: 4 }),
  }));

  getDataFromActiveSlide(selectedSlide: SelectedSlide) {
    const config: ToastConfig = {
      message: `Changed to ${selectedSlide.slide.title}`,
      messageType: 'success',
      durationInMs: 1000,
    };
    this.toastController.showToast(config);
  }
  toggleStretch() {
    this.stretch = !this.stretch;
  }
}
