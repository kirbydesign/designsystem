import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cookbook-text-link-example',
  templateUrl: './text-link-example.component.html',
  styleUrls: ['./text-link-example.component.scss'],
})
export class TextLinkExampleComponent implements OnInit {
  @Input() text: string;
  constructor() {}

  ngOnInit(): void {}
}
