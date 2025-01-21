import { Component } from '@angular/core';
import { noop } from 'rxjs';
import { CardModule } from '@kirbydesign/designsystem/card';
import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';

const config = {
  selector: 'cookbook-card-example-background-image',
  template: `<kirby-card [hasPadding]="true" themeColor="dark" (click)="noop()">
  <strong>A card with background image</strong>
  <p>
    Try resizing the viewport to see the media queries in action!
  </p>
  <p>
    Using the CSS Custom Property, we can quite easily add a gradient on top of 
    any image to enhance readability. With the input property, a similar look 
    will have to be implemented by editing the image instead.
  </p>
</kirby-card>`,
  // The @use statement is modified to match use in a project,
  // so it does not match the actual scss in this components style file.
  style: `@use '@kirbydesign/designsystem/scss/utils';

kirby-card {
  --kirby-card-background-image: linear-gradient(
      0deg,
      rgb(255 255 255 / 0%) 0%,
      rgb(0 0 0 / 50%) 100%
    ),
    url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750');

  @include utils.media('>=large') {
    --kirby-card-background-image: linear-gradient(
        0deg,
        rgb(255 255 255 / 0%) 0%,
        rgba(0, 0, 0, 50%) 100%
      ),
      url('https://images.unsplash.com/photo-1560840067-ddcaeb7831d2');
  }
}`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['card-example.shared.scss', './background-image.scss'],
  imports: [CardModule, ThemeColorDirective],
})
export class CardExampleBackgroundImageComponent {
  template: string = config.template;
  style: string = config.style;
  noop: () => void = noop;
}
