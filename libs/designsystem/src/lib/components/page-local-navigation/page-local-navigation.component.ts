import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { WindowRef } from '@kirbydesign/designsystem/types';
import { IconModule } from '@kirbydesign/designsystem/icon';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';
import { LocalNavigationItem } from './page-local-navigation-item';

@Component({
  standalone: true,
  imports: [BadgeComponent, IconModule, CommonModule],
  selector: 'kirby-page-local-navigation',
  templateUrl: './page-local-navigation.component.html',
  styleUrls: ['./page-local-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLocalNavigationComponent implements AfterViewInit {
  private readonly DEBOUNCE_TIME_MS = 250;

  @Input() items: LocalNavigationItem[] = [];
  @Input() selectedIndex = 0;

  @Output() selectedIndexChange = new EventEmitter<number>();

  @ViewChild('tabBar') tabBarElementRef?: ElementRef<HTMLElement>;
  private get tabBarNativeElement(): HTMLElement | undefined {
    return this.tabBarElementRef?.nativeElement;
  }

  constructor(private window: WindowRef) {
    console.warn(
      'Kirby Local Navigation is deprecated, and will be removed in Kirby v10. It is replaced by Kirby Tab Navigation with identical functionality, but with more flexibility and an improved API.'
    );
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.scrollToSelectedTab(this.selectedIndex);
    }, this.DEBOUNCE_TIME_MS);
  }

  onTabChange(index: number): void {
    if (this.selectedIndex !== index) {
      this.selectedIndex = index;
      this.scrollToSelectedTab(index);
      this.selectedIndexChange.emit(index);
    }
  }

  private getSelectedItemElement(index: number): HTMLElement | undefined {
    const tabBarElement = this.tabBarNativeElement;

    if (tabBarElement) {
      return tabBarElement.children.item(index) as HTMLElement;
    }
  }

  focusNext(index: number): void {
    const tabBarElement = this.tabBarNativeElement;
    if (tabBarElement) {
      const next = tabBarElement.children.item(index) as HTMLElement;
      next?.focus({ preventScroll: false });
    }
  }

  private scrollToSelectedTab(index: number): void {
    const tabBarElement = this.tabBarNativeElement;
    const selectedTabElement = this.getSelectedItemElement(index);

    if (tabBarElement && selectedTabElement) {
      const selectedTabElementWidth = selectedTabElement.getBoundingClientRect().width;
      const selectedTabElementOffsetLeft = selectedTabElement.offsetLeft;
      const tabBarElementWidth = tabBarElement.getBoundingClientRect().width;

      this.window.nativeWindow.requestAnimationFrame(() => {
        tabBarElement?.scrollTo({
          behavior: 'smooth',
          left: Math.max(
            0,
            selectedTabElementOffsetLeft - (tabBarElementWidth - selectedTabElementWidth) / 2
          ),
        });
      });
    }
  }
}
