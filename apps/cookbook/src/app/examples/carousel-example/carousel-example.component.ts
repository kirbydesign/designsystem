import { Component } from '@angular/core';
import { SlidesOptions } from '@kirbydesign/designsystem/carousel';

@Component({
  selector: 'cookbook-carousel-example',
  templateUrl: './carousel-example.component.html',
  styleUrls: ['./carousel-example.component.scss'],
})
export class CarouselExampleComponent {
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

  configExample1: SlidesOptions = {
    slidesPerView: 1.2,
    centeredSlides: true,
    centeredSlidesBounds: false,
    slidesPerGroup: 1,
    breakpoints: {
      1025: {
        centeredSlides: false,
        slidesPerView: 3.2,
        slidesPerGroup: 3,
      },
    },
  };

  configExample2: SlidesOptions = {
    slidesPerView: 1.2,
    centeredSlides: true,
    spaceBetween: 8,
    slidesPerGroup: 3,
    slidesPerGroupSkip: 3,
    breakpoints: {
      1025: {
        centeredSlides: false,
        slidesPerView: 3,

        pagination: {
          enabled: true,
        },
      },
    },
  };

  configExample3: SlidesOptions = {
    slidesPerView: 1.2,
    centeredSlides: true,
    centeredSlidesBounds: false,
    spaceBetween: 8,
    breakpoints: {
      1025: {
        slidesPerView: 3.2,
        spaceBetween: 16,
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
      subtitle: 'Subtitle 5',
      cardContent:
        '  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia facere molestias recusandae necessitatibus ab veniam repellendus doloremque culpa quam libero, est quo  accusamus cumque, in quia itaque cupiditate ratione repellat! ',
    },
    {
      title: 'Slide 7',
      subtitle: 'Subtitle 5',
      cardContent:
        '  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia facere molestias recusandae necessitatibus ab veniam repellendus doloremque culpa quam libero, est quo  accusamus cumque, in quia itaque cupiditate ratione repellat! ',
    },
    {
      title: 'Slide 8',
      subtitle: 'Subtitle 5',
      cardContent:
        '  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia facere molestias recusandae necessitatibus ab veniam repellendus doloremque culpa quam libero, est quo  accusamus cumque, in quia itaque cupiditate ratione repellat! ',
    },
    {
      title: 'Slide 9',
      subtitle: 'Subtitle 5',
      cardContent:
        '  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia facere molestias recusandae necessitatibus ab veniam repellendus doloremque culpa quam libero, est quo  accusamus cumque, in quia itaque cupiditate ratione repellat! ',
    },
  ];

  getDataFromActiveSlide($event) {
    console.log($event);
  }
}
