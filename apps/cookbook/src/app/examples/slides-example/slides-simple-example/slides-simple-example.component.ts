import { Component } from '@angular/core';
@Component({
  styleUrls: ['../slides-example.shared.scss'],
  templateUrl: './slides-simple-example.component.html',
})
export class SlidesSimpleExampleComponent {
  slides = [...Array(9).keys()].map((number) => ({
    title: `Slide ${number + 1}`,
    subtitle: `Subtitle ${number + 1}`,
    cardContent: `Lorem ipsum dolor sit amet consectetur adipisicing elit.`,
  }));
}
