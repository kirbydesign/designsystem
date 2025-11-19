import { Component, HostBinding, Input } from '@angular/core';
import { IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'kirby-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
  imports: [IonLabel],
})
export class LabelComponent {
  @Input()
  direction: 'vertical' | 'horizontal' = 'vertical';

  @HostBinding('class.horizontal')
  get _direction() {
    return this.direction === 'horizontal';
  }
}
