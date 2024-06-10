import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-card-example-default',
  template: `<kirby-card hasPadding="true">
    <strong>A card</strong>
    <p>The elevated card is the default card as it looks right out of the box.</p>
    <p>No header, footer, coloring or background-image is used here, but it does have <code>hasPadding=true</code>.</p>
</kirby-card>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./card-example.shared.scss'],
})
export class CardExampleDefaultComponent {
  template: string = config.template;
}
