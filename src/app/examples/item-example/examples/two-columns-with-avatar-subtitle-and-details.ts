import { Component } from '@angular/core';

const config = {
  selector: 'kirby-item-ex9',
  template: `
    <kirby-item>
        <kirby-avatar overlay="true">
            <kirby-icon name="cog"></kirby-icon>
        </kirby-avatar>
        <kirby-label>
            <h3>Mad og indkøb</h3>
            <h3>Mad og indkøb</h3>
            <h3>Mad og indkøb</h3>
        </kirby-label>
    </kirby-item>
    `,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemTwoColumnsWithAvatarSubtitleAndDetailsComponent {
  template: string = config.template;
}
