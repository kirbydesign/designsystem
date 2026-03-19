import { Component } from '@angular/core';
import { AvatarComponent } from '@kirbydesign/designsystem/avatar';

const config = {
  selector: 'cookbook-avatar-example-image',
  template: `<kirby-avatar imageSrc="/assets/images/woman.png" altText="Example" size="lg">
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
  template: string = config.template;
}
