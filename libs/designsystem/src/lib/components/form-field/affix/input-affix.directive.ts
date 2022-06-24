import {
  AfterViewChecked,
  ComponentRef,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

import { InputAffixComponent } from './input-affix.component';

@Directive({
  selector: '[kirby-input][affix]',
})
export class InputAffixDirective implements OnInit, OnChanges, AfterViewChecked {
  @Input() suffix: TemplateRef<any> | string | undefined;
  @Input() prefix: TemplateRef<any> | string | undefined;
  @Input() affixCtx: object = {};

  private inputEl: HTMLInputElement;
  private prefixComp: ComponentRef<InputAffixComponent> | undefined;
  private suffixComp: ComponentRef<InputAffixComponent> | undefined;

  constructor(private elementRef: ElementRef, private vcr: ViewContainerRef) {
    this.inputEl = this.elementRef.nativeElement;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.suffix && this.suffixComp) {
      this.suffixComp.instance.text = changes.suffix.currentValue;
      if (changes.affixCtx) {
        this.suffixComp.instance.ctx = changes.affixCtx;
      }
    }
    if (changes.prefix && this.prefixComp) {
      this.prefixComp.instance.text = changes.prefix.currentValue;
      if (changes.affixCtx) {
        this.prefixComp.instance.ctx = changes.affixCtx;
      }
    }
  }
  ngAfterViewChecked(): void {
    this.updateLayout();
  }
  public updateLayout(): void {
    let parent = this.inputEl.parentElement;
    let dateMask: HTMLElement;
    //
    if (parent && parent.classList.contains('date-mask-wrapper')) {
      dateMask = parent.querySelector('.date-mask');
      if (dateMask) parent.removeChild(dateMask);
      parent = parent.parentElement;
    }
    const inputBounds: DOMRect = this.inputEl.getBoundingClientRect();
    if (parent) {
      const cssVar = 'var(--input-padding)';
      const parentBounds: DOMRect = parent.getBoundingClientRect();
      const relativeTop = inputBounds.top - parentBounds.top;
      const centerY = relativeTop + inputBounds.height * 0.5;
      if (this.prefixComp) {
        const elm: HTMLElement = this.prefixComp.instance.wrapperEl.nativeElement;
        elm.style.top = `${centerY}px`;
        elm.style.left = `${cssVar}`;
        const bb = elm.getBoundingClientRect();
        const pad = `calc(${cssVar} + ${bb.width}px + calc(${cssVar}/2))`;
        this.inputEl.style.paddingLeft = pad;
        if (dateMask) {
          dateMask.style.paddingLeft = pad;
        }
      }
      if (this.suffixComp) {
        const elm: HTMLElement = this.suffixComp.instance.wrapperEl.nativeElement;
        elm.style.top = `${centerY}px`;
        elm.style.right = `${cssVar}`;
        const bb = elm.getBoundingClientRect();
        this.inputEl.style.paddingRight = `calc(${cssVar} + ${bb.width}px + calc(${cssVar}/2))`;
      }
    }
  }
  ngOnInit(): void {
    // we are going to assume that kirby input fields are always
    // wrapped in a relative positioned kirby-form-field
    if (this.suffix !== undefined) {
      const comp = this.vcr.createComponent(InputAffixComponent);
      comp.instance.type = 'suffix';
      if (this.suffix instanceof TemplateRef) {
        comp.instance.tmpl = this.suffix;
      } else if (typeof this.suffix === 'string') {
        comp.instance.text = this.suffix;
      }
      this.suffixComp = comp;
      comp.instance.ctx = this.affixCtx;
    }
    if (this.prefix !== undefined) {
      const comp = this.vcr.createComponent(InputAffixComponent);
      comp.instance.type = 'prefix';
      if (this.prefix instanceof TemplateRef) {
        comp.instance.tmpl = this.prefix;
      } else if (typeof this.prefix === 'string') {
        comp.instance.text = this.prefix;
      }
      comp.instance.ctx = this.affixCtx;
      this.prefixComp = comp;
    }
  }
}
