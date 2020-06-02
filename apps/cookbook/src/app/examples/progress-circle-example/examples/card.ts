import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-progress-circle-example-card',
  template: `<kirby-card hasPadding="true">
  <kirby-item>
    <kirby-label>
      <h2>Your investment savings</h2>
      <div>
        <data class="kirby-text-large">{{ 2435034 | currency }}</data>
      </div>
    </kirby-label>
    <kirby-progress-circle themeColor="success" value="37" slot="end">
      <kirby-icon name="moneybag" size="md"></kirby-icon>
    </kirby-progress-circle>
  </kirby-item>
</kirby-card>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ProgressCircleExampleCardComponent {
  template: string = config.template;
}
