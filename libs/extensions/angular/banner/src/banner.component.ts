import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { CardModule } from '@kirbydesign/designsystem/card';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { IconModule } from '@kirbydesign/designsystem/icon';

@Component({
  selector: 'kirby-x-banner',
  standalone: true,
  imports: [CardModule, ButtonComponent, IconModule, NgClass, CommonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class BannerComponent {
  /**
   * The title placed inside the banners header.
   */
  @Input() title: string | undefined;

  /**
   * The image shown on the banner, also used for background blur effect.
   */
  @Input() imagePath: string | undefined;

  /**
   * The body text placed inside the banners main area.
   */
  @Input() bodyText: string | undefined;

  /**
   * When an action text is supplied, a button-like call to action will be shown on the card.
   */
  @Input() actionText: string | undefined;

  /**
   * If an external link is...
   */
  @Input() externalLink: string | undefined;

  /**
   * When set, a blurred version of the image will be used as a background for the banner.
   */
  @HostBinding('class')
  @Input()
  backgroundBlur: 'dark' | 'light' | 'none' = 'dark';

  @Output() actionClick = new EventEmitter<Event>();

  bannerClicked(event: Event) {
    this.actionClick.emit(event);
  }
}
