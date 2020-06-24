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
</kirby-card>

<kirby-card hasPadding="true">
  <kirby-item>
    <kirby-progress-circle themeColor="success" value="37" slot="start">
      <kirby-icon name="moneybag" size="md"></kirby-icon>
    </kirby-progress-circle>
    <h2>Your investment savings</h2>
    <data slot="end" class="kirby-text-bold">{{ 2435034 | currency }}</data>
  </kirby-item>
</kirby-card>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styles: [
    `
      :host {
        width: 100%;
        max-width: 500px;
      }

      kirby-card:not(:first-of-type) {
        margin-top: 12px;
      }
    `,
  ],
})
export class ProgressCircleExampleCardComponent {
  template: string = config.template;
}
