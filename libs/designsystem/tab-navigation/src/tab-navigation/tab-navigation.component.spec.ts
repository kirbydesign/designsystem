import { fakeAsync, tick } from '@angular/core/testing';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { TestHelper } from '@kirbydesign/designsystem/testing';
import { BadgeComponent } from '@kirbydesign/designsystem/badge';
import { TabNavigationItemComponent } from '../tab-navigation-item/tab-navigation-item.component';

import { TabNavigationComponent } from './tab-navigation.component';

describe('TabNavigationComponent', () => {
  let component: TabNavigationComponent;
  let spectator: SpectatorHost<TabNavigationComponent>;
  let tabButtons: HTMLElement[];

  const createHost = createHostFactory({
    component: TabNavigationComponent,
    imports: [
      TestHelper.ionicModuleForTest,
      TabNavigationItemComponent,
      BadgeComponent,
      IconComponent,
    ],
  });

  beforeEach(fakeAsync(() => {
    spectator = createHost(
      `
      <kirby-tab-navigation [(selectedIndex)]="selectedIndex" aria-label="A sample Tab Navigation" aria-labelledby="tab-nav-label">
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

    tabButtons = spectator.queryAll<HTMLElement>('kirby-tab-navigation-item button');
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

  it('should forward aria-label and aria-labelledby to the tablist element', () => {
    const tabBar = spectator.query('[role="tablist"]');

    expect(tabBar).toHaveAttribute('aria-label', 'A sample Tab Navigation');
    expect(tabBar).toHaveAttribute('aria-labelledby', 'tab-nav-label');
  });

  describe('focus management', () => {
    let outsideElement: HTMLButtonElement;

    beforeEach(() => {
      outsideElement = document.createElement('button');
      document.body.appendChild(outsideElement);
    });

    afterEach(() => {
      outsideElement.focus();
      outsideElement.remove();
    });

    it('should not move focus to the selected tab on init', () => {
      tabButtons.forEach((tabButton) => expect(tabButton).not.toBeFocused());
    });

    it('should not move focus when selectedIndex is set programmatically', fakeAsync(() => {
      outsideElement.focus();

      spectator.setHostInput({ selectedIndex: 2 });
      tick();

      expect(outsideElement).toBeFocused();
      expect(tabButtons[2]).toHaveAttribute('tabindex', '0');
    }));

    it('should move focus to the next tab on pressing arrow-right', () => {
      tabButtons[0].focus();

      spectator.dispatchKeyboardEvent(tabButtons[0], 'keydown', 'ArrowRight');

      expect(tabButtons[1]).toBeFocused();
    });

    it('should move focus to the last tab on pressing end', () => {
      tabButtons[0].focus();

      spectator.dispatchKeyboardEvent(tabButtons[0], 'keydown', 'End');

      expect(tabButtons[2]).toBeFocused();
    });

    it('should move focus to the first tab on pressing home', () => {
      tabButtons[2].focus();

      spectator.dispatchKeyboardEvent(tabButtons[2], 'keydown', 'Home');

      expect(tabButtons[0]).toBeFocused();
    });

    it('should not change selection when moving focus with arrow keys', () => {
      tabButtons[0].focus();

      spectator.dispatchKeyboardEvent(tabButtons[0], 'keydown', 'ArrowRight');

      expect(component.selectedIndex).toBe(0);
      expect(tabButtons[0]).toHaveAttribute('aria-selected', 'true');
    });

    it('should make the selected tab the tab stop again when focus leaves the tablist', () => {
      tabButtons[0].focus();
      spectator.dispatchKeyboardEvent(tabButtons[0], 'keydown', 'ArrowRight');

      outsideElement.focus();

      tabButtons.forEach((tabButton, index) =>
        expect(tabButton).toHaveAttribute('tabindex', index === 0 ? '0' : '-1')
      );
    });

    it('should keep the focused tab as tab stop when clicking the already selected tab', () => {
      tabButtons[0].focus();
      spectator.dispatchKeyboardEvent(tabButtons[0], 'keydown', 'ArrowRight');

      tabButtons[0].focus();
      spectator.click(tabButtons[0]);

      tabButtons.forEach((tabButton, index) =>
        expect(tabButton).toHaveAttribute('tabindex', index === 0 ? '0' : '-1')
      );
    });

    it('should keep the focused tab as tab stop when selectedIndex is set programmatically', fakeAsync(() => {
      tabButtons[0].focus();

      spectator.setHostInput({ selectedIndex: 2 });
      tick();

      tabButtons.forEach((tabButton, index) =>
        expect(tabButton).toHaveAttribute('tabindex', index === 0 ? '0' : '-1')
      );
    }));
  });
});

describe('TabNavigationComponent without a selected tab', () => {
  let spectator: SpectatorHost<TabNavigationComponent>;

  const createHost = createHostFactory({
    component: TabNavigationComponent,
    imports: [TestHelper.ionicModuleForTest, TabNavigationItemComponent],
  });

  beforeEach(fakeAsync(() => {
    spectator = createHost(`
      <kirby-tab-navigation>
        <kirby-tab-navigation-item label="Tab1"></kirby-tab-navigation-item>
        <kirby-tab-navigation-item label="Tab2"></kirby-tab-navigation-item>
      </kirby-tab-navigation>
    `);
    tick(spectator.component.DEBOUNCE_TIME_MS);
  }));

  it('should make the first tab reachable with the tab key', () => {
    const tabButtons = spectator.queryAll('kirby-tab-navigation-item button');

    expect(tabButtons[0]).toHaveAttribute('tabindex', '0');
    expect(tabButtons[1]).toHaveAttribute('tabindex', '-1');
  });
});
