import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'kirby-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

  @Input() imageSrc: string;
  @Input() altText: string;
  @Input() size: string;

  constructor() { }

  ngOnInit() {
  }

}
