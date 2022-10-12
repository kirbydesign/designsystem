import { FormatWidth, getLocaleDateFormat } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Input,
  LOCALE_ID,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[kirby-affix]',
})
export class AffixDirective {
  @Input('kirby-affix') type: 'prefix' | 'suffix';
  constructor(public el: ElementRef) {}
}
