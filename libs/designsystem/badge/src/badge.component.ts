import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { KirbyIonicModule } from '@kirbydesign/designsystem/kirby-ionic-module';

export type BadgeSize = 'sm' | 'md';

@Component({
  selector: 'kirby-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
  standalone: true,
  imports: [CommonModule, KirbyIonicModule],
})
export class BadgeComponent {
  @Input() text: string;

  @HostBinding('class')
  @Input()
  size: BadgeSize = 'md';
}
