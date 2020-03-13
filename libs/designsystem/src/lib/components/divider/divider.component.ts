import { Component, Input } from '@angular/core';

@Component({
  selector: 'kirby-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss'],
})
export class DividerComponent {
  @Input()
  hasMargin: boolean;
}
