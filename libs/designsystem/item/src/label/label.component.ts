import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'kirby-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
  standalone: false,
})
export class LabelComponent {
  @Input()
  direction: 'vertical' | 'horizontal' = 'vertical';

  @HostBinding('class.horizontal')
  get _direction() {
    return this.direction === 'horizontal';
  }
}
