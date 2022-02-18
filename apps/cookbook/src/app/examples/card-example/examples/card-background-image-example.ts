import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-card-background-image-example',
  template: `<kirby-card
  [hasPadding]="true"
  backgroundImageUrl="https://images.unsplash.com/photo-1512917774080-9991f1c4c750"
  themeColor="dark"
>
  <h3>
    Example using input property to set background
  </h3>
  <p>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia facere molestias recusandae
    necessitatibus ab veniam repellendus doloremque culpa quam libero, est quo accusamus cumque, in
    quia itaque cupiditate ratione repellat!
  </p>
</kirby-card>`,
  style: `kirby-card {
  min-height: 300px;
}
`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styles: [config.style],
})
export class CardBackgroundImageExampleComponent {
  template: string = config.template;
  style: string = config.style;
}
