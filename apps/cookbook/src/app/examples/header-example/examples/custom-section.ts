import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-header-example-custom-section',
  template: `<kirby-header title="Title" subtitle1="Subtitle one" subtitle2="Subtitle two">
  <div class="custom-section" *kirbyHeaderCustomSection>
    <div class="flag success"></div> Custom section
  </div>
</kirby-header>`,
};
@Component({
  selector: config.selector,
  template: config.template,
  styles: [
    `
      .custom-section {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
        color: var(--kirby-text-color-semi-dark);
      }
    `,
    `
      .flag {
        width: 8px;
        height: 8px;
        border-radius: 50%;
      }
    `,
    `
      .flag.success {
        background: var(--kirby-success);
      }
    `,
  ],
})
export class HeaderExampleCustomSectionComponent {
  template = config.template;
}
