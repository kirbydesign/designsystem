import { highlightAll } from 'prismjs';

import { Component, AfterViewChecked, Input } from '@angular/core';

@Component({
  selector: 'kirby-code-viewer,kirby-html-viewer',
  templateUrl: './code-viewer.component.html',
  styleUrls: ['./code-viewer.component.scss'],
})
export class CodeViewerComponent implements AfterViewChecked {
  @Input() language: 'html' | 'css' | 'scss' | 'js' | 'ts';
  code: string;

  @Input()
  set html(value: string) {
    this.code = value;
    this.language = 'html';
  }

  @Input()
  set css(value: string) {
    this.code = value;
    this.language = 'css';
  }

  @Input()
  set scss(value: string) {
    this.code = value;
    this.language = 'css'; // TODO: 'scss'
  }

  @Input()
  set js(value: string) {
    this.code = value;
    this.language = 'js';
  }

  @Input()
  set ts(value: string) {
    this.code = value;
    this.language = 'js'; // TODO: 'ts'
  }

  ngAfterViewChecked() {
    highlightAll();
  }
}
