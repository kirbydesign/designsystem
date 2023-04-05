import { Component, ViewChild } from '@angular/core';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { ItemModule } from 'item/src';
import { MockComponent, MockComponents } from 'ng-mocks';
import { ListModule, ListSwipeAction } from 'src/lib';
import { ListItemMenuComponent } from './list-item-menu.component';

@Component({
  selector: 'kirby-mock-item',
  template: `
    <ng-template #MockKirbyItem>
      <kirby-item>
        {{ item.text }}
      </kirby-item>
    </ng-template>

    <kirby-list-item-menu
      #sutComponentRef
      [item]="item"
      [itemTemplate]="MockKirbyItem"
      [boundaryClass]="'first'"
    ></kirby-list-item-menu>
  `,
})
class MockKirbyItemComponent {
  @ViewChild('sutComponentRef') public sutComponentRef: ListItemMenuComponent;
  public item = { text: 'I am an item' };
}

describe('ListItemMenuComponent', () => {
  describe('default', () => {
    let spectator: SpectatorHost<MockKirbyItemComponent>;

    const createHost = createHostFactory({
      component: MockKirbyItemComponent,
      declarations: [MockComponent(IconComponent), MockKirbyItemComponent, ListItemMenuComponent],
      imports: [MockComponents(ButtonComponent), ListModule, ItemModule],
    });

    let sutComponent: ListItemMenuComponent;

    beforeEach(async () => {
      spectator = createHost(`<kirby-mock-item></kirby-mock-item>`);

      await spectator.fixture.whenStable();
      sutComponent = spectator.component.sutComponentRef;
    });

    it('should create', () => {
      expect(spectator).toBeTruthy();
    });

    it('should have a kirby-item', () => {
      expect(spectator.query('.menu-item')).toBeTruthy();
      expect(sutComponent.itemTemplate).toBeTruthy();
      expect(spectator.query('kirby-item')).toBeTruthy();
    });
  });
});
