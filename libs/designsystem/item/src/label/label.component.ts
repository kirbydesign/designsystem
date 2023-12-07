import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'kirby-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
})
export class LabelComponent {
  @Input()
  direction: 'vertical' | 'horizontal' = 'vertical';

  @Input()
  multiline: boolean = false;

  @HostBinding('class.horizontal')
  get _direction() {
    return this.direction === 'horizontal';
  }

  @HostBinding('class.multiline')
  get _multiline() {
    return this.multiline;
  }
}
