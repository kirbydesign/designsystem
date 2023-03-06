import { fakeAsync, tick } from '@angular/core/testing';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MockComponents } from 'ng-mocks';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { TestHelper } from '@kirbydesign/designsystem/testing';
import { KirbyBadge } from 'src/lib/components/web-component-proxies.component';
import { TabNavigationItemComponent } from '../tab-navigation-item/tab-navigation-item.component';

import { TabNavigationComponent } from './tab-navigation.component';

describe('TabNavigationComponent', () => {
  let component: TabNavigationComponent;
  let spectator: SpectatorHost<TabNavigationComponent>;
  let items: Element[];

  const createHost = createHostFactory({
    component: TabNavigationComponent,
    declarations: [TabNavigationItemComponent, MockComponents(KirbyBadge, IconComponent)],
    imports: [TestHelper.ionicModuleForTest],
  });

  beforeEach(fakeAsync(() => {
    spectator = createHost(
      `
      <kirby-tab-navigation [(selectedIndex)]="selectedIndex">
        <kirby-tab-navigation-item>
          <span text>Tab1</span>
          <kirby-badge themeColor="warning">
            <kirby-icon name="attach"></kirby-icon>
          </kirby-badge>
        </kirby-tab-navigation-item> 
        <kirby-tab-navigation-item>
          <span text>Tab2</span>
          <kirby-badge themeColor="success">
            3
          </kirby-badge>
        </kirby-tab-navigation-item> 
        <kirby-tab-navigation-item>
          <span text>Tab3</span>
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

    items = spectator.queryAll('kirby-tab-navigation-item');
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial selected class', () => {
    const initialSelected = items[component.selectedIndex];

    expect(initialSelected).toHaveClass('selected');
  });

  it('should render correct number of item badges', () => {
    const badges = spectator.queryAll('kirby-badge');

    expect(badges.length).toBe(2);
  });

  it('should select tab on click', fakeAsync(() => {
    const selectElement = items[1];

    spectator.click(selectElement);
    tick();

    expect(selectElement).toHaveClass('selected');
  }));

  it('should update selectedIndex corretly on click', fakeAsync(() => {
    const selectIndex = 1;
    const selectElement = items[selectIndex];

    spectator.click(selectElement);
    tick();

    expect(component.selectedIndex).toBe(selectIndex);
  }));

  it('should select tab on setting selectedIndex', fakeAsync(() => {
    const selectIndex = 2;
    const selectElement = items[selectIndex];

    component.selectedIndex = selectIndex;
    tick();

    expect(selectElement).toHaveClass('selected');
  }));

  it('should emit selectedIndex on tab change', fakeAsync(() => {
    const selectIndex = 1;
    const selectElement = items[selectIndex];
    spyOn(component.selectedIndexChange, 'emit');

    spectator.click(selectElement);
    tick();

    expect(component.selectedIndexChange.emit).toHaveBeenCalledWith(selectIndex);
  }));
});
