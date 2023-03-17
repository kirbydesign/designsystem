import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-header-example-combined',
  template: `
  <kirby-header title="Title" value="12.345,67" valueUnit="USD" subtitle1="Subtitle one" subtitle2="Subtitle two">
    <kirby-action-group *kirbyHeaderActions>
      <button kirby-button attentionLevel="3">
        <kirby-icon name="kirby"></kirby-icon>
      </button>
      <button kirby-button attentionLevel="3">
        Action 2
      </button>
      <button kirby-button attentionLevel="3">
        Action 3
        </button>
    </kirby-action-group>
    
    <kirby-avatar size="lg">
      <kirby-icon name="kirby"></kirby-icon>
    </kirby-avatar>

    <kirby-flag themeColor="warning">Warning</kirby-flag>
  </kirby-header>
  `,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class HeaderExampleCombinedComponent {
  template: string = config.template;
}
