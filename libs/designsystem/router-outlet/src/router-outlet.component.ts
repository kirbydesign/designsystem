import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'kirby-router-outlet',
  templateUrl: './router-outlet.component.html',
  styleUrls: ['./router-outlet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouterOutletComponent {
  @Input() main: boolean;
}
