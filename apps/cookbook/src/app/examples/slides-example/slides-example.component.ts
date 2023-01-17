import { Component, ViewChild } from '@angular/core';

import { SlidesComponent } from '@kirbydesign/designsystem/slide';

@Component({
  selector: 'cookbook-slides-example',
  templateUrl: './slides-example.component.html',
})
export class SlidesExampleComponent {
  @ViewChild(SlidesComponent) slidesComponent: SlidesComponent;
  constructor() {}

  slidesOptions = {
    spaceBetween: 5,
    centeredSlides: true,
    slidesPerView: 1.15,
    breakpoints: {
      721: {
        slidesPerView: 1.9,
      },
    },
  };

  slides = [
    {
      title: 'Slide 1',
      subtitle: 'Subtitle 1',
      cardContent:
        ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia facere molestias recusandae necessitatibus ab veniam repellendus doloremque culpa quam libero, est quo  accusamus cumque, in quia itaque cupiditate ratione repellat!',
    },
    {
      title: 'Slide 2',
      subtitle: 'Subtitle 2',
      cardContent:
        ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia facere molestias recusandae necessitatibus ab veniam repellendus doloremque culpa quam libero, est quo  accusamus cumque, in quia itaque cupiditate ratione repellat!',
    },
    {
      title: 'Slide 3',
      subtitle: 'Subtitle 3',
      cardContent:
        ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia facere molestias recusandae necessitatibus ab veniam repellendus doloremque culpa quam libero, est quo  accusamus cumque, in quia itaque cupiditate ratione repellat!',
    },
    {
      title: 'Slide 4',
      subtitle: 'Subtitle 4',
      cardContent:
        ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia facere molestias recusandae necessitatibus ab veniam repellendus doloremque culpa quam libero, est quo  accusamus cumque, in quia itaque cupiditate ratione repellat!',
    },
    {
      title: 'Slide 5',
      subtitle: 'Subtitle 5',
      cardContent:
        ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia facere molestias recusandae necessitatibus ab veniam repellendus doloremque culpa quam libero, est quo  accusamus cumque, in quia itaque cupiditate ratione repellat!',
    },
  ];

  data: any;
  selectedSlideIndex: number;

  getDataFromActiveSlide(activeSlide: { selectedData: any; selectedSlideIndex: number }) {
    this.data = activeSlide.selectedData;
    this.selectedSlideIndex = activeSlide.selectedSlideIndex;

    console.log('Output: ', activeSlide);
  }

  changeSlide() {
    this.slidesComponent.slideTo(3);
  }
}
