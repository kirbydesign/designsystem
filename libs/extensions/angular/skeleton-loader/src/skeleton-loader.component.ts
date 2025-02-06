import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { CardModule } from '@kirbydesign/designsystem/card';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { IonSkeletonText } from '@ionic/angular/standalone';

@Component({
  selector: 'kirby-x-skeleton-loader',
  standalone: true,
  imports: [CardModule, IconModule, CommonModule, IonSkeletonText],
  templateUrl: './skeleton-loader.component.html',
  styleUrl: './skeleton-loader.component.scss',
})
export class SkeletonLoaderComponent {
  /**
   * The theme for the skeleton loader to use for gradient color. Theme is automatically set when used inside a themed kirby-card.
   */
  @Input()
  theme: 'light' | 'dark' = 'light';

  /**
   * The shape of the skeleton loader.
   */
  @Input()
  shape: 'rectangle' | 'circle' | 'pill' = 'rectangle';

  @HostBinding('class')
  get _cssClass() {
    return [this.theme, this.shape].filter((cssClass) => !!cssClass);
  }
}
