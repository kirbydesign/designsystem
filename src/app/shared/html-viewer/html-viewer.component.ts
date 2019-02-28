import { highlightAll } from 'prismjs';

import { Component, AfterViewChecked, Input } from '@angular/core';

@Component({
  selector: 'kirby-html-viewer',
  templateUrl: './html-viewer.component.html',
  styleUrls: ['./html-viewer.component.scss'],
})
export class HtmlViewerComponent implements AfterViewChecked {
  @Input() html: string;

  constructor() {}

  ngAfterViewChecked() {
    highlightAll();
  }
}
