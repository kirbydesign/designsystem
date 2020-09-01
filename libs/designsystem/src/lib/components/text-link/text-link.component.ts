import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kirby-text-link',
  templateUrl: './text-link.component.html',
  styleUrls: ['./text-link.component.scss'],
})
export class TextLinkComponent implements OnInit {
  @Input() link: string;
  @Input() text: string;

  constructor() {}
  ngOnInit(): void {}

  checkDomain(url) {
    if (url.indexOf('//') === 0) {
      url = location.protocol + url;
    }
    return url
      .toLowerCase()
      .replace(/([a-z])?:\/\//, '$1')
      .split('/')[0];
  }

  isExternal() {
    const url = this.link || '';
    return (
      (url.indexOf(':') > -1 || url.indexOf('//') > -1) &&
      this.checkDomain(location.href) !== this.checkDomain(url)
    );
  }
}
