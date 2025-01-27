import { Component } from '@angular/core';
import { HeaderModule } from '@kirbydesign/designsystem/header';
import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';

const config = {
  selector: 'cookbook-header-example-custom-flag',
  template: `<kirby-header [title]="'Title'" subtitle1="Subtitle one" subtitle2="Subtitle two">
  <div class="custom-flag" *kirbyHeaderCustomFlag>
    <kirby-badge size="sm" themeColor="success"></kirby-badge> Custom content in flag section
  </div>
</kirby-header>`,
  styles: [
    `.custom-flag {
    display: flex;
    align-items: center;
    gap: 6px;
}`,
  ],
};

@Component({
  selector: config.selector,
  template: config.template,
  styles: config.styles,
  imports: [HeaderModule, ThemeColorDirective, BadgeComponent],
})
export class HeaderExampleCustomFlagComponent {
  template: string = config.template;
  styles: string = config.styles.join('\n\n');
}
