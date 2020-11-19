import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'kirby-expandable',
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpandableComponent {
  @Input() title: string;

  isExpanded: boolean = false;
}
