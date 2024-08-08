import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { CardModule } from '@kirbydesign/designsystem/card';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { IconModule } from '@kirbydesign/designsystem/icon';

@Component({
  selector: 'kirby-x-image-banner',
  standalone: true,
  imports: [CardModule, ButtonComponent, IconModule, NgClass, CommonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class ImageBannerComponent {
  /**
   * The title placed inside the banners header.
   */
  @Input() title: string | undefined;

  /**
   * The image shown on the banner, and used for the banners background blur effect.
   */
  @Input() imagePath: string | undefined;

  /**
   * The body text placed inside the banners main area.
   */
  @Input() bodyText: string | undefined;

  /**
   * Show a button with the action text in the banner.
   */
  @Input() actionButtonText: string | undefined;

  /**
   * When an internal link is supplied the whole banner will act like an anchor-tag and navigate when activated.
   */
  @Input() externalLink: string | undefined;

  /**
   * When set, a blurred version of the image will be used as a background for the banner.
   */
  @HostBinding('class')
  @Input()
  backgroundBlur: 'dark' | 'light' | 'none' = 'dark';

  /**
   * Emitted every time the banner is clicked.
   */
  @Output() bannerClick = new EventEmitter<Event>();

  public bannerClicked(event: Event) {
    this.bannerClick.emit(event);
  }
}
