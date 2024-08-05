import { Component } from '@angular/core';

const config = {
  selector: 'cookbook-avatar-example-image-error',
  template: `<kirby-avatar imageSrc="very-bad-src-path.png" (imageError)="showFallbackImageOnError($event)" size="lg"></kirby-avatar>`,
};

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['./avatar-examples.shared.scss'],
})
export class AvatarExampleImageErrorComponent {
  template: string = config.template;

  showFallbackImageOnError(event: ErrorEvent) {
    (event.target as HTMLImageElement).src = '/assets/images/avatar-not-found.png';
  }
}
