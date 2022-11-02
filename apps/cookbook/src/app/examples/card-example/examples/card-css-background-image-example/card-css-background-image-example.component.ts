import { Component } from '@angular/core';
import { noop } from 'rxjs';

const config = {
  selector: 'cookbook-card-css-background-image-example',
  style: `@use '@kirbydesign/core/src/scss/utils';

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
  templateUrl: './card-css-background-image-example.component.html',
  styleUrls: ['./card-css-background-image-example.component.scss'],
})
export class CardCssBackgroundImageExampleComponent {
  style: string = config.style;
  noop: () => void = noop;
}
