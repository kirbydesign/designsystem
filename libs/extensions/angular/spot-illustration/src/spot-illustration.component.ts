import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { CardModule } from '@kirbydesign/designsystem/card';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { IonIcon } from '@ionic/angular/standalone';
import {
  Illustration,
  IllustrationName,
  illustrations,
  SpotIllustrationSize,
} from './spot-illustrations';

@Component({
  selector: 'kirby-x-spot-illustration',
  standalone: true,
  imports: [CardModule, IconModule, CommonModule, IonIcon, IconModule, IconModule],
  templateUrl: './spot-illustration.component.html',
  styleUrl: './spot-illustration.component.scss',
})
export class SpotIllustrationComponent {
  size = input<SpotIllustrationSize>('base');
  name = input.required<IllustrationName>();

  illustration = computed(() => {
    const name = this.name();
    return name ? illustrations[name] : null;
  });

  svg = computed(() => {
    const illustration = this.illustration() as Illustration;
    const size = this.size();
    return illustration[size] ? `assets/spot-illustrations/${illustration[size]}` : undefined;
  });

  kirbyIconName = computed(() => {
    const illustration = this.illustration() as Illustration;
    return illustration && illustration.baseIsKirbyIcon && this.size() === 'base'
      ? illustration.base
      : '';
  });
}
