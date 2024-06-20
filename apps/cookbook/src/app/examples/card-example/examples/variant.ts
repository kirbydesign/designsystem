import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-card-example-variant',
  template: `
  <div class="variant-card-container">
    <kirby-card hasPadding="true">
      <strong>Elevated card</strong>
      <p>The elevated card is the default card as it looks right out of the box.</p>
    </kirby-card>
    <kirby-card hasPadding="true" variant="flat">
      <strong>Flat card</strong>
      <p>The flat card has no shadow around its edges</p>
    </kirby-card>
    <kirby-card [hasPadding]="true" variant="outlined">
      <strong>Outlined card</strong>
      <p>The outlined card is an alternative to the flat card</p>
      <a class="kirby-external-icon" target="_blank" href="https://github.com/kirbydesign/designsystem">Kirby on Github</a>
    </kirby-card>
  </div>
  `,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./card-example.shared.scss'],
})
export class CardExampleVariantComponent {
  template: string = config.template;
}
