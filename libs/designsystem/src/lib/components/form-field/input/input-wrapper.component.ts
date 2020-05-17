import {
  ChangeDetectionStrategy,
  Component,
  AfterViewInit,
  ElementRef,
  OnDestroy,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'kirby-input,kirby-textarea',
  styleUrls: ['./input-wrapper.component.scss'],
  template: `
    <ng-content select="input[kirby-input], textarea[kirby-textarea]"></ng-content>
  `,
})
export class InputWrapperComponent implements AfterViewInit, OnDestroy {
  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    document.dispatchEvent(
      new CustomEvent('ionInputDidLoad', {
        detail: this.elementRef.nativeElement,
      })
    );
  }

  ngOnDestroy(): void {
    document.dispatchEvent(
      new CustomEvent('ionInputDidUnload', {
        detail: this.elementRef.nativeElement,
      })
    );
  }
}
