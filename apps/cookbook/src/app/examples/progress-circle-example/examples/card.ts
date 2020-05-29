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
  styles: `kirby-card .content {
  display: flex;
  flex-direction: row;
}
  
kirby-card .content .information {
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
}`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styles: [config.styles],
})
export class ProgressCircleExampleCardComponent {
  template: string = config.template;
  styles: string = config.styles;
}
