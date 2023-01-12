import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'kirby-tab-navigation-item',
  templateUrl: './tab-navigation-item.component.html',
  styleUrls: ['./tab-navigation-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabNavigationItemComponent implements AfterViewInit {
  @ViewChild('tabButton')
  private tabButton: ElementRef<HTMLElement>;

  @HostBinding('attr.tabindex')
  tabindex: number = -1;

  @HostListener('focus')
  onFocus() {
    if (this.tabButtonElement) {
      this.tabButtonElement.focus();
    }
  }

  private readonly labelTextElementSelector = 'span[text]';
  private readonly labelTextElementContentAttribute = 'data-text';
  private tabButtonElement: HTMLElement;

  constructor(private elementRef: ElementRef<HTMLElement>) {
    /* */
  }

  ngAfterViewInit(): void {
    this.tabButtonElement = this.tabButton.nativeElement;
    this.initLabelText();
  }

  private initLabelText() {
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
