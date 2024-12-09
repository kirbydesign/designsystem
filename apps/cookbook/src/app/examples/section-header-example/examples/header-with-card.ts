import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-section-header-with-card',
  template: `<kirby-section-header>
  <h3 heading>Contact Info</h3>
</kirby-section-header>
<kirby-card [hasPadding]="true">
  <kirby-item>
    <kirby-avatar slot="start" imageSrc="/assets/images/woman.png" altText="Example" size="sm" title="sm">
    </kirby-avatar>
    <kirby-label>
      <p class="kirby-text-normal-bold">Name</p>
      <p class="kirby-item-detail"Telephone</p>
    </kirby-label>
    <kirby-label slot="end">
      <p class="kirby-item-detail"contact&#64;mail.com</p>
    </kirby-label>
  </kirby-item>
</kirby-card>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class SectionHeaderWithCardComponent {
  template: string = config.template;
}
