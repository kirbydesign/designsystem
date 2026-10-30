import { Component } from '@angular/core';
import { CardModule } from '@kirbydesign/designsystem/card';

const config = {
  selector: 'cookbook-card-example-variant',
  template: `
  <div class="variant-card-container">
    <kirby-card hasPadding="true">
      <strong>Elevated (default)</strong>
      <p>The card is elevated from the background.</p>
    </kirby-card>
    <kirby-card hasPadding="true" variant="flat">
      <strong>Flat</strong>
      <p>Deprecated, and now visually mapped to elevated.</p>
    </kirby-card>
    <kirby-card [hasPadding]="true" variant="outlined">
      <strong>Outlined card</strong>
      <p>Has a border and no background. Appear lowest in the visual hierarchy.</p>
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
