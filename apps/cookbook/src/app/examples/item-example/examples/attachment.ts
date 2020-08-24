import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-attachment',
  template: `<kirby-item>
  <kirby-avatar slot="start" size="xs">
    <kirby-icon name="camera"></kirby-icon>
  </kirby-avatar>
  <h3>Attach image</h3>
</kirby-item>`,
};

@Component({
  selector: config.selector,
  template: config.template,
})
export class ItemExampleAttachmentComponent {
  template: string = config.template;
}
