import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'kirby-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  @Input() imageSrc: string;
  @Input() altText: string;
  @Input() size: string;

  constructor() { }

  ngOnInit() {
  }

}
