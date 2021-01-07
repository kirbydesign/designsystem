import { Component, Input, OnInit, ChangeDetectionStrategy, HostBinding } from '@angular/core';

import { BrandColor, NotificationColor } from '../../helpers/color-helper';

@Component({
  selector: 'kirby-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent implements OnInit {
  @Input() imageSrc: string;
  @Input() altText: string;
  @Input() shadow: boolean;
  @Input() text: string;
  @Input() overlay: boolean;
  @HostBinding('class')
  @Input()
  themeColor: NotificationColor | BrandColor | 'medium' | 'white' | 'dark' | 'light' | 'semi-light';

  constructor() {}

  ngOnInit() {}
}
