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
  public readonly LABEL_TEXT_ELEMENT_SELECTOR = 'span[text]';
  public readonly LABEL_TEXT_ELEMENT_CONTENT_ATTRIBUTE = 'data-text';

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
      this.LABEL_TEXT_ELEMENT_SELECTOR
    );
    if (labelTextElement) {
      labelTextElement.setAttribute(
        this.LABEL_TEXT_ELEMENT_CONTENT_ATTRIBUTE,
        labelTextElement.textContent
      );
    }
  }
}
