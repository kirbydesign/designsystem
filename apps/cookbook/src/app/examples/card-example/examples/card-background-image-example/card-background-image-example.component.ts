import { Component } from '@angular/core';
import { noop } from 'rxjs';

const config = {
  selector: 'cookbook-card-background-image-example',
  style: `kirby-card {
  min-height: 300px;
}
`,
};

@Component({
  selector: config.selector,
  templateUrl: './card-background-image-example.component.html',
  styles: [config.style],
})
export class CardBackgroundImageExampleComponent {
  style: string = config.style;
  noop: () => void = noop;
}
