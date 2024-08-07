import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-avatar-example-image-error',
  template: `<kirby-avatar
  [imageSrc]="avatarSrc"
  (imageError)="showFallbackImageOnError($event)"
  size="lg"
></kirby-avatar>`,
  ts: `avatarSrc: string = 'bad-image-url.png';

showFallbackImageOnError(event: ErrorEvent) {
  const fallbackImageSrc =
                'assets/images/avatar-not-found.png';
  this.avatarSrc = fallbackImageSrc;
  // Possibly do something with the ErrorEvent parameter...
}
  `,
};
@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./avatar-examples.shared.scss'],
})
export class AvatarExampleImageErrorComponent {
  template: string = config.template;
  ts: string = config.ts;
  avatarSrc: string = 'bad-image-url.png';

  showFallbackImageOnError(event: ErrorEvent) {
    const fallbackImageSrc = 'assets/images/avatar-not-found.png';
    this.avatarSrc = fallbackImageSrc;
    // Possibly do something with the ErrorEvent parameter...
  }
}
