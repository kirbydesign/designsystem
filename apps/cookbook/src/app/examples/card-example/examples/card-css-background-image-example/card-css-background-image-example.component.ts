import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-card-css-background-image-example',
  template: `
<kirby-card [hasPadding]="true" themeColor="dark" (click)="function()">
  <h3>
    Example using custom css property to set background
  </h3>
  <p> 
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia facere molestias recusandae necessitatibus ab veniam repellendus doloremque culpa quam libero, est quo accusamus cumque, in quia itaque cupiditate ratione repellat!
  </p>
</kirby-card>
  `,
  style: `@use '~@kirbydesign/core/src/scss/utils';

kirby-card {
  min-height: 300px;

  --kirby-card-background-image: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(0, 0, 0, 0.6) 100%
    ),
    url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750');

  @include utils.media('>=medium') {
    --kirby-card-background-image: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(0, 0, 0, 0.4) 100%
      ),
      url('https://images.unsplash.com/photo-1560840067-ddcaeb7831d2');
  }
}`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./card-css-background-image-example.component.scss'],
})
export class CardCssBackgroundImageExampleComponent {
  template: string = config.template;
  style: string = config.style;
}
