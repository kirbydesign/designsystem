import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { highlightElement } from 'prismjs';

export function stringifyPretty(value: any) {
  return JSON.stringify(value, null, 2)
    .replace(/"/g, "'") // convert to single quotes
    .replace(/'(\w+)':/g, '$1:') // remove quotes around single-word property names
    .replace(/(\[\n)|(\},\n)|(\n\])|(\s+)/g, '$1$2$3 ') // remove additional whitespace and linebreaks within object literals
    .trim();
}

@Component({
  selector: 'cookbook-code-viewer',
  templateUrl: './code-viewer.component.html',
  styleUrls: ['./code-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeViewerComponent implements AfterViewInit, OnChanges {
  @Input() language: 'html' | 'css' | 'scss' | 'js' | 'ts' | 'typescript';
  @Input() inlineLabel = false;
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

  @ViewChild('codeElement', { read: ElementRef, static: true })
  private codeElement: ElementRef<HTMLElement>;

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

  ngAfterViewInit() {
    highlightElement(this.codeElement.nativeElement);
  }

  ngOnChanges(): void {
    this.languageTitle = this.language.toUpperCase();
    const supportedLanguage = this.supportedLanguages[this.language];
    this.codeViewerLanguage = `language-${supportedLanguage}`;
  }
}
