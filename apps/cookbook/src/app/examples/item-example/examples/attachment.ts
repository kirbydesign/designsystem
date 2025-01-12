import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-attachment',
  template: `<kirby-item>
  <kirby-avatar slot="start" size="xs">
    <kirby-icon name="camera"></kirby-icon>
  </kirby-avatar>
  <p class="kirby-item-title">Attach image</p>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  standalone: false,
})
export class ItemExampleAttachmentComponent {
  template: string = config.template;
}
