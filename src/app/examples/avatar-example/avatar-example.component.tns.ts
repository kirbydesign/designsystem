import { Component, OnInit } from '@angular/core';

import { Sizes } from '@kirbydesign/designsystem/directives/size/size.directive';

@Component({
  selector: 'kirby-avatar-example',
  templateUrl: './avatar-example.component.html',
  styleUrls: ['./avatar-example.component.scss'],
})
export class AvatarExampleComponent implements OnInit {
  imageSrc = '~/assets/images/woman.png';
  altText: 'Kirby Avatar Example';
  sizes = Sizes;

  constructor() {}

  ngOnInit() {}
}
