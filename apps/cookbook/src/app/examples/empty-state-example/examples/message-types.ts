import { Component } from '@angular/core';
import { EmptyStateModule } from '@kirbydesign/designsystem/empty-state';
import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';

const config = {
  template: `<div class="message-type-container">
  <kirby-empty-state
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
  ></kirby-empty-state>
</div>`,
};

@Component({
  selector: 'cookbook-empty-state-message-types-example',
  template: config.template,
  styleUrls: ['./empty-state-example.shared.scss'],
  imports: [EmptyStateModule, ThemeColorDirective],
})
export class EmptyStateMessageTypesExampleComponent {
  template: string = config.template;
}
