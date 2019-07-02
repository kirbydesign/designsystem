import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'kirby-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  // Using host property decorator is fine for static values:
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    class: 'kirby-avatar',
  },
})
export class AvatarComponent implements OnInit {
  @Input() imageSrc: string;
  @Input() altText: string;
  @Input() shadow?: false;
  @Input() overlay?: true;

  constructor() {}

  ngOnInit() {}
}
