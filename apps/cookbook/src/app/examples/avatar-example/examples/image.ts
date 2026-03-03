import { Component } from '@angular/core';
import { AvatarComponent } from '@kirbydesign/designsystem/avatar';

const config = {
  selector: 'cookbook-avatar-example-image',
  template: `<div class="avatar-item-container">
  <div class="avatar-item-inner-container">
    <kirby-avatar imageSrc="/assets/images/woman.png" altText="Example" size="lg">
    </kirby-avatar>
  </div>
    <span class="avatar-item-title">Default</span>
</div>

<div class="avatar-item-container">
  <div class="avatar-item-inner-container">
    <kirby-avatar imageSrc="/assets/images/woman.png" altText="Example" overlay="true" size="lg">
    </kirby-avatar>
  </div>
    <span class="avatar-item-title">Overlay</span>
</div>

<div class="avatar-item-container">
  <div class="avatar-item-inner-container">
    <kirby-avatar imageSrc="/assets/images/woman.png" altText="Example" stroke="true" size="lg">
    </kirby-avatar>
  </div>
    <span class="avatar-item-title">Stroke</span>
</div>`,

  htmlSnippet: `<kirby-avatar imageSrc="/assets/images/woman.png" altText="Example" size="lg">
</kirby-avatar>

<kirby-avatar imageSrc="/assets/images/woman.png" altText="Example" overlay="true" size="lg">
</kirby-avatar>

<kirby-avatar imageSrc="/assets/images/woman.png" altText="Example" stroke="true" size="lg">
</kirby-avatar>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./avatar-examples.shared.scss'],
  host: { '[class.align-top]': 'true' },
  imports: [AvatarComponent],
})
export class AvatarExampleImageComponent {
  htmlSnippet: string = config.htmlSnippet;
}
