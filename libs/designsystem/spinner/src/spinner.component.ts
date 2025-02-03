import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'kirby-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SpinnerComponent {}
