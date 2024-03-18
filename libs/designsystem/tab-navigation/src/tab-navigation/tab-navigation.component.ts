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
  ViewChild,
} from '@angular/core';
import { WindowRef } from '@kirbydesign/designsystem/types';
import { KeyboardHandlerService } from '@kirbydesign/designsystem/dropdown';
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

  @Input()
  get selectedIndex(): number {
    return this._selectedIndex;
  }

  set selectedIndex(index: number) {
    if (index !== this._selectedIndex && index !== -1) {
      this._selectedIndex = index;

      this.focusIndex = index;
      this.selectTab(this.selectedIndex);
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

      this.scrollToTab(this.focusIndex);
      this.focusTab(this.focusIndex);
    }
  }
  private _focusIndex = -1;

  @Output()
  selectedIndexChange = new EventEmitter<number>();

  constructor(private window: WindowRef, private keyboardHandlerService: KeyboardHandlerService) {
    /**/
  }

  ngAfterViewInit(): void {
    this.tabBarElement = this.tabBar.nativeElement;
    this.setTabElements();
    this.updateTabElementsOnChanges();
  }

  @HostListener('click', ['$event'])
  @HostListener('keydown.enter', ['$event'])
  onItemSelect(event: PointerEvent) {
    if (event.target !== this.tabBarElement) {
      const targetTabNavItem = (event.target as HTMLElement).closest('button');
      this.selectedIndex = this.tabButtonElements.indexOf(targetTabNavItem);
    }
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
  }

  private selectTab(tabIndex: number): void {
    this.tabButtonElements.forEach((tabButtonElement, index) => {
      tabButtonElement.setAttribute('aria-selected', index === tabIndex ? 'true' : 'false');
    });
  }

  private focusTab(focusIndex: number): void {
    this.tabButtonElements.forEach((tabButtonElement, index) => {
      tabButtonElement.setAttribute('tabindex', index === focusIndex ? '0' : '-1');
    });

    if (0 <= focusIndex && focusIndex < this.tabButtonElements.length) {
      this.tabButtonElements[focusIndex].focus();
    }
  }

  private scrollToTab(tabIndex: number): void {
    if (0 <= tabIndex && tabIndex < this.tabElements.length) {
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
    this.scrollToTab(this.focusIndex);
    this.focusTab(this.focusIndex);
  }

  private updateTabElementsOnChanges() {
    this.tabs.changes.subscribe(() => {
      this.tabElements = [];
      this.tabButtonElements = [];
      this.setTabElements();
    });
  }
}
