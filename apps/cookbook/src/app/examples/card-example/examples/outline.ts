import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-card-example-outline',
  template: `<kirby-card [hasPadding]="true" variant="outlined">
    <strong>This is an outlined card</strong>
    <p>This card has no background and does not react on theming.</p>
    <p>The outlined card is an alternative to the flat card and may be used for displaying information of lesser relevance to the primary use case.</p>
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
