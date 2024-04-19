import { IonItem, IonList } from '@ionic/angular/standalone';
import { DesignTokenHelper } from '@kirbydesign/designsystem/helpers';
import { ItemComponent } from '@kirbydesign/designsystem/item';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';

import { ListExperimentalComponent } from './list-experimental.component';

const borderRadius = DesignTokenHelper.borderRadius();
const { getElevation } = DesignTokenHelper;

describe('ListExperimental', () => {
  let spectator: SpectatorHost<ListExperimentalComponent>;

  const createHost = createHostFactory({
    component: ListExperimentalComponent,
    declarations: [
      ListExperimentalComponent,
      MockComponent(IonList),
      MockComponent(IonItem),
      MockComponent(ItemComponent),
    ],
  });

  describe('with slotted kirby-item elements', () => {
    let listContent: HTMLElement;
    let items: HTMLElement[];

    beforeEach(() => {
      spectator = createHost<ListExperimentalComponent>(`
      <kirby-list-experimental>
        <kirby-item>Test Item</kirby-item>
        <kirby-item>Test Item</kirby-item>
        <kirby-item>Test Item</kirby-item>
        <kirby-item>Test Item</kirby-item>
      </kirby-list-experimental>`);

      items = spectator.queryHostAll('kirby-item');
      listContent = items[0].parentElement;
      expect(listContent).not.toBeUndefined();
    });

    it('should create', () => {
      expect(spectator.component).toBeTruthy();
    });

    it('should render items in list', () => {
      expect(items).toHaveLength(4);
    });

    it('should apply rounded corners to the list content', () => {
      expect(listContent).toHaveComputedStyle({
        'border-radius': borderRadius,
        overflow: 'hidden',
      });
    });

    it('should apply correct elevation to the list content', () => {
      const correctElevation = getElevation(2);
      expect(listContent).toHaveComputedStyle({
        'box-shadow': correctElevation,
      });
    });

    it('should not apply --item-padding-top/bottom to items that are not first or last', () => {
      items.forEach((item, index) => {
        if (index === items.length - 1 || index === 0) return;
        expect(item).toHaveComputedStyle({
          '--item-padding-top': '',
          '--item-padding-bottom': '',
        });
      });
    });

    it('should apply correct --item-padding-top to the first item', () => {
      const correctPadding = DesignTokenHelper.size('xxs');
      expect(items[0]).toHaveComputedStyle({
        '--item-padding-top': correctPadding,
      });
    });

    it('should apply correct --item-padding-bottom to the last item', () => {
      const correctPadding = DesignTokenHelper.size('xxs');
      expect(items[items.length - 1]).toHaveComputedStyle({
        '--item-padding-bottom': correctPadding,
      });
    });
  });

  describe('with content in the "outside" slot', () => {
    let listContent: HTMLElement;

    beforeEach(() => {
      spectator = createHost<ListExperimentalComponent>(`
      <kirby-list-experimental>
        <div id="slotted-outside" outside>Hello</div>
        <div id="slotted-default">List item</div>
      </kirby-list-experimental>`);
      listContent = spectator.queryHost('#slotted-default').parentElement;
      expect(listContent).not.toBeUndefined();
    });

    it('should place slotted content above the list-content', () => {
      const { previousElementSibling } = listContent;
      console.log(previousElementSibling);
      console.log(listContent);

      expect(previousElementSibling.id).toEqual('slotted-outside');
    });
  });
});
