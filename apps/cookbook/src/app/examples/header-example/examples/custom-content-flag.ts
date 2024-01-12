import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-header-example-custom-content-flag',
  template: `<kirby-header [title]="'Title'" subtitle1="Subtitle one" subtitle2="Subtitle two">
  <div class="custom-section" *kirbyHeaderCustomFlagSection>
  <kirby-badge size="sm" themeColor="success"></kirby-badge> Custom content in flag section
</div>
</kirby-header>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class HeaderExampleCustomContentFlagComponent {
  template: string = config.template;
}
