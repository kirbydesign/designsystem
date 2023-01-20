import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-card-example-flat',
  template: `<kirby-card hasPadding="true" flat="true">
    <strong>A flat card</strong>
    <p>This is a default card as it looks right out of the box.</p>
    <p>No header, footer, coloring or background-image is used here, but it does have <code>hasPadding=true</code>.</p>
</kirby-card>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./card-example.shared.scss'],
})
export class CardExampleFlatComponent {
  template: string = config.template;
}
