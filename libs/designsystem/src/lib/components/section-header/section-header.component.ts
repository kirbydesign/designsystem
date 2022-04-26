import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'kirby-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHeaderComponent {}
