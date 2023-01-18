import { Component } from '@angular/core';
import { noop } from 'rxjs';

const config = {
  selector: 'cookbook-card-example-clickable',
  template: `<kirby-card hasPadding="true" (click)="noop()">
  <strong>A card with state</strong>
  <p> 
    Note how this card can also be focussed with tab keyboard navigation.
  </p>
  <p>
    Pressing enter or space will automatically trigger the registered click function too!
  </p>
</kirby-card>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./card-example.shared.scss'],
})
export class CardExampleClickableComponent {
  template: string = config.template;
  noop: () => void = noop;
}
