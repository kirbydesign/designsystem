import { Component } from '@angular/core';

const config = {
  selector: 'kirby-item-example',
  template: `<kirby-item>
  <kirby-label badges>
    <div style="background: var(--kirby-primary-shade); width: 8px;height: 8px; border-radius:50%"></div>
    <div style="background: var(--kirby-warning-shade); width: 8px;height: 8px; border-radius:50%"></div>

  </kirby-label>
  <kirby-label>
    <h3>Title</h3>
    <h4>Subtitle</h4>
  </kirby-label>
  <kirby-label>
    <h3>Value</h3>
    <h4>Subvalue</h4>
  </kirby-label>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemDefaultExampleComponent {
  template: string = config.template;
}
