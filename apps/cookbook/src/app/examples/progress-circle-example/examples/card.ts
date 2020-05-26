import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-progress-circle-example-card',
  template: `<kirby-card hasPadding="true">
  <div class="content">
    <div class="information">
      Your investment savings
      <span class="kirby-text-large">
        {{ 2435034 | currency }}
      </span>
    </div>
    <kirby-progress-circle themeColor="success" value="37">
      <kirby-icon name="moneybag" size="md"></kirby-icon>
    </kirby-progress-circle>
  </div>
</kirby-card>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./card.scss'],
})
export class ProgressCircleExampleCardComponent {
  template: string = config.template;
}
