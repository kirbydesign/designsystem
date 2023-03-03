import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
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

  @Input()
  label = '';

  private tabButtonElement: HTMLElement;

  constructor(private elementRef: ElementRef<HTMLElement>) {
    /* */
  }

  ngAfterViewInit(): void {
    this.tabButtonElement = this.tabButton.nativeElement;
  }
}
