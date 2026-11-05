import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { CardComponent } from '@kirbydesign/designsystem/card';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { IonSkeletonText } from '@ionic/angular';

@Component({
  selector: 'kirby-x-skeleton-loader',
  standalone: true,
  imports: [CardComponent, IconComponent, IonSkeletonText],
  templateUrl: './skeleton-loader.component.html',
  styleUrl: './skeleton-loader.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class SkeletonLoaderComponent {
  /**
   * @deprecated The skeleton loader now follows the surface it's placed on, so this input no longer has any effect.
   * This input will be removed in a future major version.
   */
  @Input() set theme(_value: 'light' | 'dark') {
    console.warn(
      `[Kirby Skeleton Loader] The 'theme' input is deprecated and no longer has any effect.
        The skeleton loader now follows the surface it's placed on. This input will be removed in a future major version.`
    );
  }

  /**
   * The shape of the skeleton loader.
   */
  @Input()
  shape: 'rectangle' | 'circle' | 'pill' = 'rectangle';

  @HostBinding('class')
  get _cssClass() {
    return [this.shape].filter((cssClass) => !!cssClass);
  }
}
