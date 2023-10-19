import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MockComponents } from 'ng-mocks';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { TestHelper } from '@kirbydesign/designsystem/testing';

import { BadgeComponent } from '@kirbydesign/designsystem/badge';
import { TabNavigationItemComponent } from './tab-navigation-item.component';

describe('TabNavigationItemComponent', () => {
  let component: TabNavigationItemComponent;
  let spectator: SpectatorHost<TabNavigationItemComponent>;

  const createHost = createHostFactory({
    component: TabNavigationItemComponent,
    declarations: [TabNavigationItemComponent, MockComponents(BadgeComponent, IconComponent)],
    imports: [TestHelper.ionicModuleForTest],
  });

  beforeEach(() => {
    spectator = createHost(
      `
      <kirby-tab-navigation-item label="Tab1">
        <kirby-badge themeColor="warning">
          <kirby-icon name="attach"></kirby-icon>
        </kirby-badge>
      </kirby-tab-navigation-item> 
      `
    );

    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct text', () => {
    const textElement = spectator.query('span[data-text]');

    expect(textElement).toHaveExactText('Tab1');
  });

  it('should set the data attribute with the correct text', () => {
    const textElement = spectator.query('span[data-text]');

    expect(textElement).toHaveAttribute('data-text', 'Tab1');
  });

  it('should render correct number of badges', () => {
    const badges = spectator.queryAll('kirby-badge');

    expect(badges.length).toBe(1);
  });
});
