import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-progress-circle-example-content-avatar',
  template: `<kirby-progress-circle value="25" themeColor="danger" size="sm">
  <kirby-avatar themeColor="white">
    <kirby-icon name="kirby"></kirby-icon>
  </kirby-avatar>
</kirby-progress-circle>

<kirby-progress-circle value="50" themeColor="warning">
  <kirby-avatar themeColor="white">
    <kirby-icon name="kirby"></kirby-icon>
  </kirby-avatar>
</kirby-progress-circle>

<kirby-progress-circle value="75" themeColor="success" size="lg">
  <kirby-avatar themeColor="white">
    <kirby-icon name="kirby"></kirby-icon>
  </kirby-avatar>
</kirby-progress-circle>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styles: [
    `
      :host {
        display: flex !important;
        align-items: center;
      }

      kirby-progress-circle {
        margin-right: 20px;
      }
    `,
  ],
})
export class ProgressCircleExampleContentAvatarComponent {
  template: string = config.template;
}
