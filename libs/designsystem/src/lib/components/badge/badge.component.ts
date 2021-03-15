import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'kirby-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
})
export class BadgeComponent {
  @HostBinding('class.kirby-badge') isKirbyBadge: boolean = true;
  @Input() text: string;
}
