import { Component } from '@angular/core';

import { config as customSectionConfig } from './custom-section';

const config = {
  selector: 'cookbook-header-example-combined',
  template: `<kirby-header title="Title" value="12.345,67" valueUnit="USD" subtitle1="Subtitle one" subtitle2="Subtitle two">
  <kirby-action-group *kirbyHeaderActions>
    <button kirby-button attentionLevel="3">
      <kirby-icon name="kirby"></kirby-icon>
      Action 1
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

  <div class="custom-section" *kirbyHeaderCustomSection>
    <div class="flag success"></div> Custom section
  </div>
</kirby-header>`,
  styles: customSectionConfig.styles,
};

@Component({
  selector: config.selector,
  template: config.template,
  styles: config.styles,
})
export class HeaderExampleCombinedComponent {
  template: string = config.template;
  styles: string = config.styles.join('\n\n');
}
