import { Component } from '@angular/core';
import {
  carouselDefaultConfig,
  exampleComponentHTML,
} from '../../examples/carousel-example/carousel-code-snippets';
@Component({
  selector: 'cookbook-carousel-showcase',
  templateUrl: './carousel-showcase.component.html',
  styleUrls: ['./carousel-showcase.component.scss'],
})
export class CarouselShowcaseComponent {
  carouselDefaultConfig: string = carouselDefaultConfig;
  exampleComponentHTML: string = exampleComponentHTML;
}
