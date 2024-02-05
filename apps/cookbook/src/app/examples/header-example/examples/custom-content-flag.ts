import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-header-example-custom-content-flag',
  template: `<kirby-header [title]="'Title'" subtitle1="Subtitle one" subtitle2="Subtitle two">
  <div class="custom-section" *kirbyHeaderCustomFlag>
  <kirby-badge size="sm" themeColor="success"></kirby-badge> Custom content in flag section
</div>
</kirby-header>`,
  styles: [
    `.custom-section {
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
})
export class HeaderExampleCustomFlagComponent {
  template: string = config.template;
}
