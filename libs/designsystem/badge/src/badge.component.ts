import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { ThemeColorDirective } from '@kirbydesign/designsystem/shared';
import { IonBadge } from '@ionic/angular/standalone';

export type BadgeSize = 'sm' | 'md';

@Component({
  selector: 'kirby-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
  standalone: true,
  imports: [CommonModule, IonBadge],
  hostDirectives: [{ directive: ThemeColorDirective, inputs: ['themeColor'] }],
})
export class BadgeComponent {
  @Input() text: string;

  @HostBinding('class')
  @Input()
  size: BadgeSize = 'md';
}
