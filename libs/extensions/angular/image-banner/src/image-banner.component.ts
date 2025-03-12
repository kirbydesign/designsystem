import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { CardModule } from '@kirbydesign/designsystem/card';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { TranslationService } from '@kirbydesign/designsystem/shared';
import { ImageBannerHeightDirective } from './image-banner-height.directive';

@Component({
  selector: 'kirby-x-image-banner',
  imports: [CardModule, ButtonComponent, IconModule, CommonModule],
  hostDirectives: [ImageBannerHeightDirective],
  templateUrl: './image-banner.component.html',
  styleUrl: './image-banner.component.scss',
})
export class ImageBannerComponent {
  /**
   * The title placed inside the image banners header.
   */
  @Input() title: string | undefined;

  /**
   * The image shown on the banner, and used for the background blur effect.
   */
  @Input() imagePath: string | undefined;

  /**
   * The body text placed below the title.
   */
  @Input() bodyText: string | undefined;

  /**
   * Whether the button should be shown in narrow view or not.
   */
  @Input() showButtonInNarrowView: boolean = false;

  /**
   * The text of the button in the content area of the image banner. If left empty, will default to 'Read more' (or equivalent translation for [supported locales](https://cookbook.kirby.design/#/home/localization)).
   */
  @Input() actionButtonText: string | undefined = this.translations.get('readMore');

  /**
   * When an external link is supplied the entire banner will be an anchor-tag and navigate when activated.
   */
  @Input() externalLink: string | undefined;

  /**
   * The blur-effect used for the background.
   */
  @HostBinding('class')
  @Input()
  backgroundBlur: 'dark' | 'light' | 'none' = 'dark';

  /**
   * Emitted every time the banner is activated. The entire banner is interactive, and will be activated by click and keyboard interaction.
   */
  @Output() bannerClick = new EventEmitter<Event>();

  /**
   * If subscribed to, a dismiss button will be shown. Emitted every time the dismiss button is activated by click and keyboard interaction.
   */
  @Output() dismissClick = new EventEmitter<Event>();

  /**
   * If the input imagePath results in an error, it will be reflected in this output.
   */
  @Output()
  imageError = new EventEmitter<ErrorEvent>();

  constructor(public translations: TranslationService) {}

  public bannerClicked(event: Event) {
    const eventTarget = event.target as HTMLElement;
    const dismissButtonClicked = eventTarget.closest('.dismiss');
    if (dismissButtonClicked) return;
    this.bannerClick.emit(event);
  }

  public dismissClicked(event: Event) {
    this.dismissClick.emit(event);
  }

  public onImageError($event: ErrorEvent) {
    this.imageError.emit($event);
  }
}
