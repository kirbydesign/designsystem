import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-card-example-outline',
  template: `<kirby-card [hasPadding]="true" [variant]="'outlined'">
    <strong>An outlined card</strong>
    <p>Use with caution.</p>
    <p>In general the look and feel of the default card is preferred in most use cases as it elevates the card a bit from the background.
    But if you need an outlined look, here it is!</p>
</kirby-card>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./card-example.shared.scss'],
})
export class CardExampleOutlineComponent {
  template: string = config.template;
}
