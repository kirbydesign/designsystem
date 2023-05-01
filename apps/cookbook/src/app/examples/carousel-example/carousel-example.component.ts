import { Component, ViewChild } from '@angular/core';
import { KirbySwiperOptions } from '@kirbydesign/designsystem/carousel';
import { CarouselComponent } from '@kirbydesign/designsystem/carousel';
import { noop } from 'rxjs';

@Component({
  selector: 'cookbook-carousel-example',
  templateUrl: './carousel-example.component.html',
  styleUrls: ['./carousel-example.component.scss'],
})
export class CarouselExampleComponent {
  @ViewChild(CarouselComponent) carouselComponent: CarouselComponent;

  maxWidth: string = 'full';

  maxWidthOptions = [
    {
      text: 'default',
      value: 'default',
    },
    {
      text: 'standard',
      value: 'standard',
    },
    {
      text: 'optimized',
      value: 'optimized',
    },
    {
      text: 'full',
      value: 'full',
    },
  ];

  ignorePagePadding: boolean = false;

  onCheckedChange($event) {
    this.ignorePagePadding = $event;
  }

  config: KirbySwiperOptions = {
    slidesPerView: 1.2,
    centeredSlides: true,
    slidesPerGroup: 1,
    breakpoints: {
      992: {
        centeredSlides: false,
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
    },
  };

  config1: KirbySwiperOptions = {
    slidesPerView: 1.2,
    centeredSlides: true,
    slidesPerGroup: 1,
    speed: 400,
    breakpoints: {
      992: {
        centeredSlides: false,
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
    },
  };

  config2: KirbySwiperOptions = {
    slidesPerView: 1.2,
    centeredSlides: true,
    slidesPerGroup: 1,
    speed: 500,
    breakpoints: {
      992: {
        centeredSlides: false,
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
    },
  };

  config3: KirbySwiperOptions = {
    slidesPerView: 1.2,
    centeredSlides: true,
    slidesPerGroup: 1,
    speed: 600,
    breakpoints: {
      992: {
        centeredSlides: false,
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
    },
  };

  slides = [
    {
      title: 'Slide 1',
      subtitle: 'Subtitle 1',
      cardContent:
        '  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia facere molestias recusandae necessitatibus ab veniam repellendus doloremque culpa quam libero, est quo  accusamus cumque, in quia itaque cupiditate ratione repellat! ',
    },
    {
      title: 'Slide 2',
      subtitle: 'Subtitle 2',
      cardContent:
        '  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia facere molestias recusandae necessitatibus ab veniam repellendus doloremque culpa quam libero, est quo  accusamus cumque, in quia itaque cupiditate ratione repellat! ',
    },
    {
      title: 'Slide 3',
      subtitle: 'Subtitle 3',
      cardContent:
        '  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia facere molestias recusandae necessitatibus ab veniam repellendus doloremque culpa quam libero, est quo  accusamus cumque, in quia itaque cupiditate ratione repellat! ',
    },
    {
      title: 'Slide 4',
      subtitle: 'Subtitle 4',
      cardContent:
        '  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia facere molestias recusandae necessitatibus ab veniam repellendus doloremque culpa quam libero, est quo  accusamus cumque, in quia itaque cupiditate ratione repellat! ',
    },
    {
      title: 'Slide 5',
      subtitle: 'Subtitle 5',
      cardContent:
        '  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia facere molestias recusandae necessitatibus ab veniam repellendus doloremque culpa quam libero, est quo  accusamus cumque, in quia itaque cupiditate ratione repellat! ',
    },
    {
      title: 'Slide 6',
      subtitle: 'Subtitle 6',
      cardContent:
        '  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia facere molestias recusandae necessitatibus ab veniam repellendus doloremque culpa quam libero, est quo  accusamus cumque, in quia itaque cupiditate ratione repellat! ',
    },
    {
      title: 'Slide 7',
      subtitle: 'Subtitle 7',
      cardContent:
        '  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia facere molestias recusandae necessitatibus ab veniam repellendus doloremque culpa quam libero, est quo  accusamus cumque, in quia itaque cupiditate ratione repellat! ',
    },
    {
      title: 'Slide 8',
      subtitle: 'Subtitle 8',
      cardContent:
        '  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia facere molestias recusandae necessitatibus ab veniam repellendus doloremque culpa quam libero, est quo  accusamus cumque, in quia itaque cupiditate ratione repellat! ',
    },
    {
      title: 'Slide 9',
      subtitle: 'Subtitle 9',
      cardContent:
        '  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia facere molestias recusandae necessitatibus ab veniam repellendus doloremque culpa quam libero, est quo  accusamus cumque, in quia itaque cupiditate ratione repellat! ',
    },
  ];

  getDataFromActiveSlide($event) {
    console.log($event);
  }
}
