import { Component } from '@angular/core';
import { CardModule } from '@kirbydesign/designsystem/card';
import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';

const config = {
  selector: 'cookbook-card-example-color',
  template: `<kirby-card hasPadding="true" [themeColor]="'tertiary'">
  <strong>A themed card</strong>
  <p>This cards color is defined by the themeColor input property.</p>
  <p>The only recommended value for themeColor is tertiary.</p>
</kirby-card>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./card-example.shared.scss'],
  imports: [CardModule, ThemeColorDirective],
})
export class CardExampleColorComponent {
  template: string = config.template;
}
