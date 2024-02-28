import { Component } from '@angular/core';
import { SelectedSlide } from '@kirbydesign/designsystem/slide';
import { ToastConfig, ToastController } from '@kirbydesign/designsystem/toast';

@Component({
  styleUrls: ['../slides-example.shared.scss'],
  templateUrl: './slides-simple-example.component.html',
  styles: `kirby-card {height: 100%;justify-content: start}`,
})
export class SlidesSimpleExampleComponent {
  constructor(private toastController: ToastController) {}

  lorem =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus leo quis libero posuere auctor. Quisque ornare lectus finibus tellus sollicitudin, et blandit quam semper. Ut sed lacus eget dui blandit consequat. Nam commodo sit amet augue vel dapibus. Mauris tincidunt nulla eget porttitor euismod. Ut at massa massa. Curabitur suscipit ullamcorper felis, vitae tincidunt eros varius in. Duis et tellus eu turpis varius dictum. Mauris mattis posuere ligula nec pharetra. Vestibulum a augue at nulla elementum fringilla. Duis vehicula finibus turpis, vel dignissim magna ullamcorper vitae. Nam vel elit orci.';

  randomIntegerBetween = (max, min) => Math.floor(Math.random() * (max - min + 1) + min);

  slides = [...Array(9).keys()].map((number) => ({
    title: `Slide ${number + 1}`,
    subtitle: `Subtitle ${number + 1}`,
    cardContent: this.lorem.split(' ').slice(0, this.randomIntegerBetween(6, 12)).join(' '),
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
