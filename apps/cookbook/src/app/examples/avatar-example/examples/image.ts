import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-avatar-example-image',
  template: `<kirby-avatar imageSrc="/assets/images/woman.png" altText="Example" size="lg"></kirby-avatar>

<kirby-avatar imageSrc="/assets/images/woman.png" altText="Example" size="lg" overlay="true" title="Overlay"></kirby-avatar>

<kirby-avatar imageSrc="/assets/images/woman.png" altText="Example" size="lg" shadow="true" title="Shadow"></kirby-avatar>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./avatar-examples.shared.scss'],

  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: { '[class.align-top]': 'true' },
})
export class AvatarExampleImageComponent {
  template: string = config.template;
}
