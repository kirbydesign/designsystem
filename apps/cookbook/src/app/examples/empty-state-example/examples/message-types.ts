import { Component } from '@angular/core';

const config = {
  template: `<kirby-empty-state
  iconName="verify"
  themeColor="success"
  title="Success"
  subtitle="Additional messaging via subtitle"
></kirby-empty-state>
<kirby-empty-state
  iconName="help"
  themeColor="warning"
  title="Warning"
  subtitle="Additional messaging via subtitle"
></kirby-empty-state>
<kirby-empty-state
  iconName="overview-outline"
  title="Empty"
  subtitle="Additional messaging via subtitle"
></kirby-empty-state>`,
};

@Component({
  selector: 'cookbook-empty-state-message-types-example',
  template: config.template,
  styles: [
    `
      :host {
        display: flex;
        gap: 2rem;
        justify-content: space-around;
      }
    `,
  ],
})
export class EmptyStateMessageTypesExampleComponent {
  template: string = config.template;
}
