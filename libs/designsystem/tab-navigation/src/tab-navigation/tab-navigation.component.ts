import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  QueryList,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { WindowRef } from '@kirbydesign/designsystem/types';
import { KeyboardHandlerService } from '@kirbydesign/designsystem/dropdown';
import { forwardAttributes } from '@kirbydesign/designsystem/shared';
import { TabNavigationItemComponent } from '../tab-navigation-item/tab-navigation-item.component';

@Component({
  selector: 'kirby-tab-navigation',
  templateUrl: './tab-navigation.component.html',
  styleUrls: ['./tab-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabNavigationComponent implements AfterViewInit {
  public readonly DEBOUNCE_TIME_MS = 250;

  @ViewChild('tabBar')
  private tabBar: ElementRef<HTMLElement>;

  @ContentChildren(TabNavigationItemComponent, { read: ElementRef })
  private tabs: QueryList<ElementRef<HTMLElement>>;

  private tabBarElement: HTMLElement;
  private tabElements = new Array<HTMLElement>();
  private tabButtonElements = new Array<HTMLElement>();

  private _attributesToForward: string[] = ['aria-label', 'aria-labelledby'];

  @Input()
  get selectedIndex(): number {
    return this._selectedIndex;
  }

  set selectedIndex(index: number) {
    if (index !== this._selectedIndex && index !== -1) {
      this._selectedIndex = index;

      if (!this.containsFocus()) {
        this.focusIndex = index;
      }

      this.selectTab(this.selectedIndex);
      this.scrollToTab(this.selectedIndex);
      this.selectedIndexChange.emit(this.selectedIndex);
    }
  }
  private _selectedIndex = -1;

  get focusIndex(): number {
    return this._focusIndex;
  }

  set focusIndex(index: number) {
    if (index !== this._focusIndex) {
      this._focusIndex = index;

      this.updateRovingTabindex();
    }
  }
  private _focusIndex = -1;

  @Output()
  selectedIndexChange = new EventEmitter<number>();

  constructor(
    private window: WindowRef,
    private keyboardHandlerService: KeyboardHandlerService,
    private renderer: Renderer2,
    private elementRef: ElementRef<HTMLElement>
  ) {}

  ngAfterViewInit(): void {
    this.tabBarElement = this.tabBar.nativeElement;
    this.setTabElements();
    this.updateTabElementsOnChanges();

    forwardAttributes(
      this.elementRef.nativeElement,
      this._attributesToForward,
      this.renderer,
      this.tabBarElement
    );
  }

  @HostListener('click', ['$event'])
  onItemSelect(event: MouseEvent) {
    this.selectedIndex = this.indexOfTabNavButton(event.target);
  }

  @HostListener('keydown.home', ['$event'])
  @HostListener('keydown.end', ['$event'])
  @HostListener('keydown.arrowright', ['$event'])
  @HostListener('keydown.arrowleft', ['$event'])
  onKeydown(event: KeyboardEvent) {
    event.preventDefault();
    this.focusIndex = this.keyboardHandlerService.handle(
      event,
      this.focusIndex,
      this.tabElements.length - 1,
      true
    );
    this.scrollToTab(this.focusIndex);
    this.focusTab(this.focusIndex);
  }

  @HostListener('focusin', ['$event'])
  onFocusIn(event: FocusEvent) {
    const focusedIndex = this.indexOfTabNavButton(event.target);
    if (focusedIndex !== -1) {
      this.focusIndex = focusedIndex;
    }
  }

  @HostListener('focusout', ['$event'])
  onFocusOut(event: FocusEvent) {
    const focusLeftTabNavigation = !this.elementRef.nativeElement.contains(
      event.relatedTarget as Node
    );
    if (focusLeftTabNavigation) {
      this.focusIndex = this.selectedIndex;
    }
  }

  private selectTab(tabIndex: number): void {
    this.tabButtonElements.forEach((tabButtonElement, index) => {
      tabButtonElement.setAttribute('aria-selected', index === tabIndex ? 'true' : 'false');
    });
  }

  private updateRovingTabindex(): void {
    const tabStopIndex = this.isValidTabIndex(this.focusIndex) ? this.focusIndex : 0;

    this.tabButtonElements.forEach((tabButtonElement, index) => {
      tabButtonElement.setAttribute('tabindex', index === tabStopIndex ? '0' : '-1');
    });
  }

  private focusTab(tabIndex: number): void {
    if (this.isValidTabIndex(tabIndex)) {
      this.tabButtonElements[tabIndex].focus();
    }
  }

  private indexOfTabNavButton(target: EventTarget): number {
    return this.tabButtonElements.indexOf((target as Element).closest<HTMLElement>('[role="tab"]'));
  }

  private isValidTabIndex(tabIndex: number): boolean {
    return 0 <= tabIndex && tabIndex < this.tabButtonElements.length;
  }

  private containsFocus(): boolean {
    return this.elementRef.nativeElement.contains(document.activeElement);
  }

  private scrollToTab(tabIndex: number): void {
    if (this.isValidTabIndex(tabIndex)) {
      const selectedTabElement = this.tabElements[tabIndex];
      const selectedTabElementWidth = selectedTabElement.getBoundingClientRect().width;
      const selectedTabElementOffsetLeft = selectedTabElement.offsetLeft;
      const tabBarElementWidth = this.tabBarElement.getBoundingClientRect().width;

      this.window.nativeWindow.requestAnimationFrame(() => {
        this.tabBarElement?.scrollTo({
          behavior: 'smooth',
          left: Math.max(
            0,
            selectedTabElementOffsetLeft - (tabBarElementWidth - selectedTabElementWidth) / 2
          ),
        });
      });
    }
  }

  private setTabElements() {
    this.tabs.forEach((tab) => {
      this.tabElements.push(tab.nativeElement);
    });

    this.tabElements.forEach((tabElement) =>
      this.tabButtonElements.push(tabElement.querySelector('[role="tab"]'))
    );

    this.selectTab(this.selectedIndex);
    this.updateRovingTabindex();

    setTimeout(() => {
      this.scrollToTab(this.focusIndex);
    }, this.DEBOUNCE_TIME_MS);
  }

  private updateTabElementsOnChanges() {
    this.tabs.changes.subscribe(() => {
      this.tabElements = [];
      this.tabButtonElements = [];
      this.setTabElements();
    });
  }
}
