import { Component } from '@angular/core';
import { ButtonComponent, IconModule, ToggleButtonModule } from '@kirbydesign/designsystem';

const config = {
  selector: 'cookbook-toggle-button-disabled',
  template: `<kirby-toggle-button>
    <button kirby-button unchecked aria-disabled="true" attentionLevel="3" aria-label="Notifications disabled">
        <kirby-icon name="notification"></kirby-icon>
    </button>
    <button kirby-button checked attentionLevel="3" aria-label="Notifications enabled">
        <kirby-icon name="notification-fill"></kirby-icon>
    </button>
</kirby-toggle-button>

<kirby-toggle-button>
  <button kirby-button unchecked aria-disabled="true" attentionLevel="3">Disabled</button>
  <button kirby-button checked >Activated</button>
</kirby-toggle-button>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrl: './_shared.scss',
  imports: [ToggleButtonModule, ButtonComponent, IconModule],
})
export class ToggleButtonDisabledExampleComponent {
  template: string = config.template;
}
