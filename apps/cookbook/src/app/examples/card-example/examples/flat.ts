import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-card-example-flat',
  template: `<kirby-card hasPadding="true" variant="flat">
    <strong>A flat card</strong>
    <p>Use with caution.</p>
    <p>In general the look and feel of the default card is preferred in most use cases as it elevates the card a bit from the background,
    but if you need a flat look, here it is!</p>
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
