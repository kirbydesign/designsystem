import { Component, AfterViewChecked, Input } from '@angular/core';
import Prism from 'prismjs';

@Component({
  selector: 'kirby-html-viewer',
  templateUrl: './html-viewer.component.html',
  styleUrls: ['./html-viewer.component.scss']
})
export class HtmlViewerComponent implements AfterViewChecked {
  @Input() html: string;

  constructor() { }

  ngAfterViewChecked() {
    Prism.highlightAll();
  }

}
