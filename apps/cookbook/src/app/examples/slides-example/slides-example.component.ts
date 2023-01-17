import { Component, ViewChild } from '@angular/core';

import { SlidesComponent } from '@kirbydesign/designsystem/slide';

const config = {
  selector: 'cookbook-slides-example',
  template: `<kirby-slides
  [slidesOptions]="slidesOptions"
  [slides]="slides"
  (selectedSlide)="getDataFromActiveSlide($event)"
>
      <kirby-card  *kirbySlide="let slide; let i = index" [hasPadding]="true">
        <kirby-card-header
          [title]="slide.title"
          [subtitle]="slide.subtitle"
        ></kirby-card-header>

        <!-- Card content example: -->
        <div class="card-content">
          {{ slide.cardContent }}
        </div>
    </kirby-card>
</kirby-slides>
<br />
<div style="text-align: center">
  <button kirby-button (click)="changeSlide()">Activate slide no. 4</button>
</div>
`,
  codeSnippet: `slidesOptions = {
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
      ' Lorem, ipsum dolor ...',
  },
  {
    title: 'Slide 2',
    subtitle: 'Subtitle 2',
    cardContent:
    ' Lorem, ipsum dolor ...',
  },
  {
    title: 'Slide 3',
    subtitle: 'Subtitle 3',
    cardContent:
    ' Lorem, ipsum dolor ...',
  },
  {
    title: 'Slide 4',
    subtitle: 'Subtitle 4',
    cardContent:
    ' Lorem, ipsum dolor ...',
  },
  {
    title: 'Slide 5',
    subtitle: 'Subtitle 5',
    cardContent:
    ' Lorem, ipsum dolor ...',
  },
];
`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class SlidesExampleComponent {
  @ViewChild(SlidesComponent) slidesComponent: SlidesComponent;
  template: string = config.template;
  codeSnippet: string = config.codeSnippet;

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
