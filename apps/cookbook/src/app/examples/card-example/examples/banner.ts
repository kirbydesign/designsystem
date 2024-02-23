import { Component } from '@angular/core';
import { noop } from 'rxjs';

const config = {
  selector: 'cookbook-card-example-banner',
  codeSnippet: `<kirby-card  hasPadding="true" (click)="noop()">
  <kirby-card-footer [hasPadding]="false">
  <kirby-item disclosure="arrow-more">
    Banner call to action
  </kirby-item>
</kirby-card-footer>

</kirby-card>`,
  template: `<kirby-card hasPadding="true" (click)="noop()">
  <kirby-card-footer [hasPadding]="false">
    <kirby-item disclosure="arrow-more">
      Banner call to action
    </kirby-item>
  </kirby-card-footer>
</kirby-card>`,
  style: `@use '@kirbydesign/designsystem/scss/utils';
 
  `,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./card-example.shared.scss', './banner.scss'],
  styles: [config.style],
})
export class CardExampleBannerComponent {
  template: string = config.template;
  style: string = config.style;
  noop: () => void = noop;
}
