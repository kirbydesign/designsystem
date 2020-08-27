import { Component, OnInit, Input, ViewChild, ElementRef, ContentChildren } from '@angular/core';

@Component({
  selector: 'kirby-text-link',
  templateUrl: './text-link.component.html',
  styleUrls: ['./text-link.component.scss'],
})
export class TextLinkComponent implements OnInit {
  baseUrl = window.location.origin;

  @Input() link: string;
  @Input() text: string;

  constructor() {}
  ngOnInit(): void {
    console.log('TextLinkComponent -> constructor ->     this.isExternal()', this.isExternal());
  }
  /*
Will not work if link contains multiple nested paths
Needs more work
*/

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
    const url = this.link;
    console.log('TextLinkComponent -> isExternal -> url', url);
    return (
      (url.indexOf(':') > -1 || url.indexOf('//') > -1) &&
      this.checkDomain(location.href) !== this.checkDomain(url)
    );
  }
}
