import { Component } from '@angular/core';
import { HeaderModule } from '@kirbydesign/designsystem/header';
import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';

export const config = {
  selector: 'cookbook-header-example-custom-section',
  template: `<kirby-header [title]="'Title'" subtitle1="Subtitle one" subtitle2="Subtitle two">
  <div class="custom-section" *kirbyHeaderCustomSection>
    <kirby-badge size="sm" themeColor="success"></kirby-badge> Custom section
  </div>
</kirby-header>`,
  styles: [
    `.custom-section {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--kirby-text-color-semi-dark);
}`,
  ],
};
@Component({
  selector: config.selector,
  template: config.template,
  styles: config.styles,
  imports: [HeaderModule, ThemeColorDirective, BadgeComponent],
})
export class HeaderExampleCustomSectionComponent {
  template = config.template;
  styles: string = config.styles.join('\n\n');
}
