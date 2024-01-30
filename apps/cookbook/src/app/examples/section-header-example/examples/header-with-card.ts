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
      <h3 class="kirby-text-bold">Name</h3>
      <p detail>Telephone</p>
    </kirby-label>
    <kirby-label slot="end">
      <p detail>contact&#64;mail.com</p>
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
