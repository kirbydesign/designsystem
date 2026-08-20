import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import {
  Illustration,
  illustrations,
  SpotIllustrationName,
  SpotIllustrationSize,
} from './spot-illustrations';

@Component({
  selector: 'kirby-x-spot-illustration',
  imports: [IonIcon],
  templateUrl: './spot-illustration.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './spot-illustration.component.scss',
})
export class SpotIllustrationComponent {
  /**
   * The size of the Spot Illustration
   */
  size = input<SpotIllustrationSize>(SpotIllustrationSize.MD);

  /**
   * The name of the Spot Illustration to display
   */
  name = input.required<SpotIllustrationName>();

  illustration = computed(() => {
    const name = this.name();
    return name ? illustrations[name] : null;
  });

  svg = computed(() => {
    const illustration = this.illustration() as Illustration;
    const size = this.size();
    return illustration && illustration[size]
      ? `assets/spot-illustrations/${illustration[size]}`
      : undefined;
  });
}
