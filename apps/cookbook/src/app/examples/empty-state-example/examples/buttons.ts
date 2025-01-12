import { Component } from '@angular/core';

const config = {
  template: `<kirby-empty-state
  iconName="kirby"
  title="Button attention levels"
  subtitle="Additional messaging via subtitle"
>
  <button kirby-button attentionLevel="1">Primary action</button>
  <button kirby-button attentionLevel="2">Secondary action</button>
</kirby-empty-state>
`,
};

@Component({
  selector: 'cookbook-empty-state-buttons-example',
  template: config.template,
  standalone: false,
})
export class EmptyStateButtonsExampleComponent {
  template: string = config.template;
}
