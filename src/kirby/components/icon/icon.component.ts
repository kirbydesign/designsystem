import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'kirby-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
  @Input() name = '';

  spriteFile = '../../assets/icons/icon-sprite.svg';

  constructor() { }

  ngOnInit() {
  }

}
