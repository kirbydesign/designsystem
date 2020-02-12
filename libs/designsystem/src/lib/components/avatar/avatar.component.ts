import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Avatar } from './avatar.interface';

@Component({
  selector: 'kirby-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent implements OnInit, Avatar {
  @Input() imageSrc: string;
  @Input() altText: string;
  @Input() shadow?: false;
  @Input() text?: string;
  @Input() overlay?: true;

  constructor() {}

  ngOnInit() {}
}
