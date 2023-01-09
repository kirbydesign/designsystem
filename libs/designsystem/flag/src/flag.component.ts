import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'kirby-flag',
  template: ` <ng-content></ng-content> `,
  styleUrls: ['./flag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlagComponent {
  @Input() size: 'xs' | 'sm' | 'md' = 'md';
  @Input() themeColor: 'success' | 'warning' | 'danger' | 'semi-light' | 'transparent' =
    'transparent';

  @HostBinding('class')
  get _cssClass() {
    return [this.themeColor, this.size];
  }
}
