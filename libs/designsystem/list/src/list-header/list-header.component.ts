import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'kirby-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ListHeaderComponent {
  constructor() {}
}
