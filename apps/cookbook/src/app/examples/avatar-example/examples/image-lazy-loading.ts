import { Component } from '@angular/core';
import { AvatarComponent } from '@kirbydesign/designsystem/avatar';

const config = {
  selector: 'cookbook-avatar-example-image-loazy-loading',
  template: `<kirby-avatar imageSrc="/assets/images/woman.png" imageLoading="lazy" size="lg"></kirby-avatar>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./avatar-examples.shared.scss'],
  imports: [AvatarComponent],
})
export class AvatarExampleImageLazyLoadingComponent {
  template: string = config.template;
}
