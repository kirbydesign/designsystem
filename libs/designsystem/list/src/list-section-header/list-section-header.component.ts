import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'kirby-list-section-header',
  templateUrl: './list-section-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListSectionHeaderComponent {
  @Input() title: string;
}
