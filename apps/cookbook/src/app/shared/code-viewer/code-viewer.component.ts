import { highlightElement } from 'prismjs';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'cookbook-code-viewer',
  templateUrl: './code-viewer.component.html',
  styleUrls: ['./code-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeViewerComponent implements AfterViewInit, OnChanges {
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

  ngOnChanges(_: SimpleChanges): void {
    this.languageTitle = this.language.toUpperCase();
    const supportedLanguage = this.supportedLanguages[this.language];
    this.codeViewerLanguage = `language-${supportedLanguage}`;
  }
}
