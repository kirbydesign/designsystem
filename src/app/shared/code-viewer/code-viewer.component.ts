import { highlightAll } from 'prismjs';
import { Component, AfterViewChecked, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'kirby-code-viewer',
  templateUrl: './code-viewer.component.html',
  styleUrls: ['./code-viewer.component.scss'],
})
export class CodeViewerComponent implements OnChanges, AfterViewChecked {
  @Input() language: 'html' | 'css' | 'scss' | 'js' | 'ts' | 'typescript';
  code: string;
  languageTitle: string;
  supportedLanguages = {
    html: 'html',
    css: 'css',
    scss: 'css',
    js: 'js',
    ts: 'js',
    typescript: 'js',
  };
  codeViewerLanguage: string;

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
    this.language = 'ts';
  }

  ngOnChanges(_: SimpleChanges): void {
    this.languageTitle = this.language.toUpperCase();
    const supportedLanguage = this.supportedLanguages[this.language];
    this.codeViewerLanguage = `language-${supportedLanguage}`;
  }

  ngAfterViewChecked() {
    highlightAll();
  }
}
