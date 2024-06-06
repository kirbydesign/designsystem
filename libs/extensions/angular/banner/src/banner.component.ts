import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardModule } from '@kirbydesign/designsystem/card';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { IconModule } from '@kirbydesign/designsystem/icon';

@Component({
  selector: 'kirby-x-banner',
  standalone: true,
  imports: [CardModule, ButtonComponent, IconModule, NgClass],
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
   * The text used for the CTA button.
   */
  @Input() actionButtonText: string | undefined;

  /**
   * The link used on the CTA button.
   */
  @Input() actionButtonLink: string | undefined;

  /**
   * The filter used for the blurred background image.
   */
  @Input() imageFilter: 'dark' | 'white' = 'white';
}
