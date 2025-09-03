import { Component, computed, input } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import {
  Illustration,
  IllustrationName,
  illustrations,
  SpotIllustrationSize,
} from './spot-illustrations';

@Component({
  selector: 'kirby-x-spot-illustration',
  imports: [IonIcon],
  templateUrl: './spot-illustration.component.html',
  styleUrl: './spot-illustration.component.scss',
})
export class SpotIllustrationComponent {
  size = input<SpotIllustrationSize>(SpotIllustrationSize.MD);
  name = input.required<IllustrationName>();

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
