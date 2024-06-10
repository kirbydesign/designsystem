import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-card-example-outline',
  template: `<kirby-card style="display=flex;"[hasPadding]="true" variant="outlined">
    <strong>This is an outlined card</strong>
    <p>This card has no background and does not react on theming</p>
    <p>In general the look and feel of the default card is preferred in most use cases as it elevates the card a bit from the background,
    but if you need an outlined look, here it is!</p>
    <a class="kirby-external-icon" target="_blank" href="https://github.com/kirbydesign/designsystem">Kirby on Github</a>
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
