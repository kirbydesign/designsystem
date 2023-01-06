import {
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  QueryList,
  ViewChild,
} from '@angular/core';
import { filter, fromEvent } from 'rxjs';
import { WindowRef } from '@kirbydesign/designsystem/types';
import { TabNavigationItemComponent } from '../tab-navigation-item/tab-navigation-item.component';

const KEY_ENTER = 'Enter';

@Component({
  selector: 'kirby-tab-navigation',
  templateUrl: './tab-navigation.component.html',
  styleUrls: ['./tab-navigation.component.scss'],
})
export class TabNavigationComponent implements AfterViewInit {
  @ContentChildren(TabNavigationItemComponent, { read: ElementRef })
  private tabs: QueryList<ElementRef<HTMLElement>>;

  @ViewChild('tabBar')
  private tabBar: ElementRef<HTMLElement>;

  private readonly tabSelectedClassName = 'selected';
  private tabBarElement: HTMLElement;
  private tabElements = new Array<HTMLElement>();

  private selectedTabIndex = -1;

  constructor(private window: WindowRef) {
    /**/
  }

  ngAfterViewInit(): void {
    console.log('--- Tabs: ' + this.tabs.length + ' ---');
    //this.tabs.forEach((tab) => console.log('#', tab));
    this.tabBarElement = this.tabBar.nativeElement;

    this.tabs.forEach((tab) => this.tabElements.push(tab.nativeElement));

    this.tabElements.forEach((tabElement, index) => {
      fromEvent(tabElement, 'click').subscribe(() => this.setSelectedTab(index));
      /*
      fromEvent(tabElement, 'keydown')
        .pipe(filter((e: KeyboardEvent) => e.key === KEY_ENTER))
        .subscribe(() => this.setSelectedTab(index));
        */
    });
  }

  private setSelectedTab(tabIndex: number): void {
    this.tabElements.forEach((tabElement, index) => {
      tabElement.classList.remove(this.tabSelectedClassName);
      if (tabIndex === index) {
        tabElement.classList.add(this.tabSelectedClassName);
      }
    });
    this.scrollToTab(tabIndex);

    this.selectedTabIndex = tabIndex;
  }

  private scrollToTab(tabIndex: number): void {
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
