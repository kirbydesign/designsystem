import { Component } from '@angular/core';
import { EmptyStateModule } from '@kirbydesign/designsystem/empty-state';
import { ButtonComponent } from '@kirbydesign/designsystem/button';

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
  imports: [EmptyStateModule, ButtonComponent],
})
export class EmptyStateButtonsExampleComponent {
  template: string = config.template;
}
