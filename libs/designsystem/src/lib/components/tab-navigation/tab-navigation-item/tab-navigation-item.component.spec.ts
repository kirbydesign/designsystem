import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MockComponents } from 'ng-mocks';
import { BadgeComponent } from '../..';
import { TestHelper } from '../../../testing/test-helper';
import { IconComponent } from '../../icon';

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
      <kirby-tab-navigation-item>
        <span text>Tab1</span>
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

  it('should render correct number of badges', () => {
    const badges = spectator.queryAll('kirby-badge');

    expect(badges.length).toBe(1);
  });

  it('should render the correct text', () => {
    const textElement = spectator.query(component.LABEL_TEXT_ELEMENT_SELECTOR);

    expect(textElement).toHaveExactText('Tab1');
    expect(textElement).toHaveAttribute(component.LABEL_TEXT_ELEMENT_CONTENT_ATTRIBUTE, 'Tab1');
  });

  it('should set the data attribute with the correct text', () => {
    const textElement = spectator.query(component.LABEL_TEXT_ELEMENT_SELECTOR);

    expect(textElement).toHaveAttribute(component.LABEL_TEXT_ELEMENT_CONTENT_ATTRIBUTE, 'Tab1');
  });
});
