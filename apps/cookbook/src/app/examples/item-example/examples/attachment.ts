import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-item-example-attachment',
  template: `<kirby-item>
  <kirby-avatar slot="start">
    <kirby-icon name="camera" size="sm"></kirby-icon>
  </kirby-avatar>
  <h3>Attach image</h3>
</kirby-item>`,
  styles: [
    `
    kirby-avatar {
      border-radius: 8px;
      background-color: var(--kirby-light);
      width: 32px;
      height: 32px;
    }
    kirby-avatar kirby-icon {
      margin-top: -8px;
      margin-left: -8px;
    },
`,
  ],
};

@Component({
  selector: config.selector,
  template: config.template,
  styles: config.styles,
})
export class ItemExampleAttachmentComponent {
  template: string = config.template;
}
