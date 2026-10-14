import { Component } from '@angular/core';
import { CardModule } from '@kirbydesign/designsystem/card';

const config = {
  selector: 'cookbook-card-example-variant',
  template: `
  <div class="variant-card-container">
     <kirby-card hasPadding="true" variant="base">
      <strong>Base</strong>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </kirby-card>
    <kirby-card hasPadding="true">
      <strong>Raised</strong>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </kirby-card>
    <kirby-card [hasPadding]="true" variant="brand">
      <strong>Brand</strong>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </kirby-card>
  </div>
  `,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./card-example-variant.scss'],
  imports: [CardModule],
})
export class CardExampleVariantComponent {
  template: string = config.template;
}
