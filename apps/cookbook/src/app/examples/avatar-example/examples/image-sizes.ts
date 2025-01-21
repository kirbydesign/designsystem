import { Component } from '@angular/core';
import { AvatarComponent } from '@kirbydesign/designsystem/avatar';

const config = {
  selector: 'cookbook-avatar-example-image-size',
  template: `<kirby-avatar imageSrc="/assets/images/woman.png" altText="Example" size="xs" title="xs"></kirby-avatar>
<kirby-avatar imageSrc="/assets/images/woman.png" altText="Example" size="sm" title="sm"></kirby-avatar>
<kirby-avatar imageSrc="/assets/images/woman.png" altText="Example" size="md" title="md"></kirby-avatar>
<kirby-avatar imageSrc="/assets/images/woman.png" altText="Example" size="lg" title="lg"></kirby-avatar>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./avatar-examples.shared.scss'],
  imports: [AvatarComponent],
})
export class AvatarExampleImageSizeComponent {
  template: string = config.template;
}
