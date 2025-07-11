import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonItemDivider } from '@ionic/angular/standalone';

@Component({
  imports: [IonItemDivider],
  selector: 'kirby-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHeaderComponent {}
