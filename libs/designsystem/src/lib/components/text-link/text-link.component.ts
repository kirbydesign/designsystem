import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kirby-text-link',
  templateUrl: './text-link.component.html',
  styleUrls: ['./text-link.component.scss'],
})
export class TextLinkComponent implements OnInit {
  baseUrl = window.location.origin;
  @Input() link: string;

  constructor() {}
  ngOnInit(): void {}

  inAppLink() {
    let appLink = true;
    if (!this.link.includes('baseUrl') || this.link.split('/').length != 1) {
      appLink = false;
    }
    return appLink;
  }
}
