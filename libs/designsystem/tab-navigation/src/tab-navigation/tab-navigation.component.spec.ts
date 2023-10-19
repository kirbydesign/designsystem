import { fakeAsync, tick } from '@angular/core/testing';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MockComponents } from 'ng-mocks';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { TestHelper } from '@kirbydesign/designsystem/testing';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';
import { TabNavigationItemComponent } from '../tab-navigation-item/tab-navigation-item.component';

import { TabNavigationComponent } from './tab-navigation.component';

describe('TabNavigationComponent', () => {
  let component: TabNavigationComponent;
  let spectator: SpectatorHost<TabNavigationComponent>;
  let tabButtons: Element[];

  const createHost = createHostFactory({
    component: TabNavigationComponent,
    declarations: [TabNavigationItemComponent, MockComponents(BadgeComponent, IconComponent)],
    imports: [TestHelper.ionicModuleForTest],
  });

  beforeEach(fakeAsync(() => {
    spectator = createHost(
      `
      <kirby-tab-navigation [(selectedIndex)]="selectedIndex">
        <kirby-tab-navigation-item label="Tab1">
          <kirby-badge themeColor="warning">
            <kirby-icon name="attach"></kirby-icon>
          </kirby-badge>
        </kirby-tab-navigation-item> 
        <kirby-tab-navigation-item label="Tab2">
          <kirby-badge themeColor="success">
            3
          </kirby-badge>
        </kirby-tab-navigation-item> 
        <kirby-tab-navigation-item label="Tab3">
        </kirby-tab-navigation-item> 
      </kirby-tab-navigation>
      `,
      {
        hostProps: {
          selectedIndex: 0,
        },
      }
    );

    component = spectator.component;
    tick(component.DEBOUNCE_TIME_MS);

    tabButtons = spectator.queryAll('kirby-tab-navigation-item button');
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render correct number of item badges', () => {
    const badges = spectator.queryAll('kirby-badge');

    expect(badges.length).toBe(2);
  });

  it('should update selectedIndex corretly on tab selection', fakeAsync(() => {
    const selectIndex = 1;
    const selectElement = tabButtons[selectIndex];

    spectator.click(selectElement);
    tick();

    expect(component.selectedIndex).toBe(selectIndex);
  }));

  it('should select tab on setting selectedIndex', fakeAsync(() => {
    const selectIndex = 2;
    const selectElement = tabButtons[selectIndex];

    component.selectedIndex = selectIndex;
    tick();

    expect(selectElement).toHaveAttribute('aria-selected', 'true');
  }));

  it('should emit selectedIndex on tab selection', fakeAsync(() => {
    const selectIndex = 1;
    const selectElement = tabButtons[selectIndex];
    spyOn(component.selectedIndexChange, 'emit');

    spectator.click(selectElement);
    tick();

    expect(component.selectedIndexChange.emit).toHaveBeenCalledWith(selectIndex);
  }));

  it('should not emit selectedIndexChange if index is -1', () => {
    spyOn(component.selectedIndexChange, 'emit');

    component.selectedIndex = -1;

    expect(component.selectedIndexChange.emit).not.toHaveBeenCalled();
  });

  it('should set tabindex correctly on pressing arrow-right', fakeAsync(() => {
    const selectIndex = 1;
    const selectElement = tabButtons[selectIndex];

    spectator.click(selectElement);
    tick();
    spectator.dispatchKeyboardEvent(selectElement, 'keydown', 'ArrowRight');

    tabButtons.forEach((tabButton, index) =>
      expect(tabButton).toHaveAttribute('tabindex', index === selectIndex + 1 ? '0' : '-1')
    );
  }));

  it('should set tabindex correctly on pressing arrow-left', fakeAsync(() => {
    const selectIndex = 1;
    const selectElement = tabButtons[selectIndex];

    spectator.click(selectElement);
    tick();
    spectator.dispatchKeyboardEvent(selectElement, 'keydown', 'ArrowLeft');

    tabButtons.forEach((tabButton, index) =>
      expect(tabButton).toHaveAttribute('tabindex', index === selectIndex - 1 ? '0' : '-1')
    );
  }));

  it('should set tabindex and aria-selected correctly on setting selectedIndex', fakeAsync(() => {
    const selectIndex = 1;

    component.selectedIndex = selectIndex;
    tick();

    tabButtons.forEach((tabButton, index) => {
      expect(tabButton).toHaveAttribute('tabindex', index === selectIndex ? '0' : '-1');
      expect(tabButton).toHaveAttribute('aria-selected', index === selectIndex ? 'true' : 'false');
    });
  }));

  it('should set tabindex and aria-selected correctly on tab selection', fakeAsync(() => {
    const selectIndex = 1;
    const selectElement = tabButtons[selectIndex];

    spectator.click(selectElement);
    tick();

    tabButtons.forEach((tabButton, index) => {
      expect(tabButton).toHaveAttribute('tabindex', index === selectIndex ? '0' : '-1');
      expect(tabButton).toHaveAttribute('aria-selected', index === selectIndex ? 'true' : 'false');
    });
  }));
});
