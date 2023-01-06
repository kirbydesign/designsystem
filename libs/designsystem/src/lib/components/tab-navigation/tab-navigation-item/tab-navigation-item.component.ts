import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  HostBinding,
  Inject,
  Query,
} from '@angular/core';

@Component({
  selector: 'kirby-tab-navigation-item',
  templateUrl: './tab-navigation-item.component.html',
  styleUrls: ['./tab-navigation-item.component.scss'],
})
export class TabNavigationItemComponent implements AfterViewInit {
  private readonly labelTextElementSelector = 'span[text]';
  private readonly labelTextElementContentAttribute = 'data-text';

  constructor(private elementRef: ElementRef<HTMLElement>) {
    /* */
  }

  ngAfterViewInit(): void {
    const labelTextElement = this.elementRef.nativeElement.querySelector(
      this.labelTextElementSelector
    );
    if (labelTextElement) {
      labelTextElement.setAttribute(
        this.labelTextElementContentAttribute,
        labelTextElement.textContent
      );
    }
  }
}
