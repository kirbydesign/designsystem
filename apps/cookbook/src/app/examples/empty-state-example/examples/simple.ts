import { Component } from '@angular/core';
import { EmptyStateComponent } from '@kirbydesign/designsystem/empty-state';
import { ButtonComponent } from '@kirbydesign/designsystem/button';

const config = {
  template: `<kirby-empty-state
  title="Simple"
  subtitle="A subtitle with a &#10; newline inserted in the template."
>
  <button kirby-button attentionLevel="1">Resolve state</button>
</kirby-empty-state>
`,
};

@Component({
  selector: 'cookbook-empty-state-simple-example',
  template: config.template,
  imports: [EmptyStateComponent, ButtonComponent],
})
export class EmptyStateSimpleExampleComponent {
  template: string = config.template;
}
