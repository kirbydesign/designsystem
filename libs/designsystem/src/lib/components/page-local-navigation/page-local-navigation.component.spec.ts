import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { TestHelper } from '@kirbydesign/designsystem/testing';
import { LocalNavigationItem } from './page-local-navigation-item';
import { PageLocalNavigationComponent } from './page-local-navigation.component';

describe('PageLocalNavigationComponent', () => {
  const items: LocalNavigationItem[] = [
    {
      text: 'Beholdning',
    },
    {
      text: 'Marked',
      badge: {
        content: { name: 'attach', isCustom: false },
        themeColor: 'warning',
      },
    },
    {
      text: 'Inspiration',
      badge: {
        themeColor: 'success',
        content: { text: '2' },
      },
    },
    {
      text: 'Item 4',
    },
    {
      text: 'Item 5 longer',
    },
    {
      text: 'Item 6 longer',
    },
  ];

  let component: PageLocalNavigationComponent;
  let spectator: SpectatorHost<PageLocalNavigationComponent>;

  const createHost = createHostFactory({
    component: PageLocalNavigationComponent,
    imports: [TestHelper.ionicModuleForTest],
  });

  beforeEach(() => {
    spectator = createHost(
      `<kirby-page-local-navigation [items]="items" [selectedIndex]="0"></kirby-page-local-navigation>`,
      {
        hostProps: {
          items,
        },
      }
    );
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  items.forEach((item, i) => {
    it(`should render correct item at index: ${i}`, () => {
      const tabItemElement = spectator.queryAll('.tab-item')[i];
      expect(tabItemElement).toContainText(item.text);
    });
  });

  it('should render correct number of item badges', () => {
    expect(spectator.queryAll('kirby-badge').length).toBe(2);
  });

  it('should have initial selected class', () => {
    const initial = spectator.queryAll('.tab-item')[component.selectedIndex];
    expect(initial).toHaveClass('selected');
  });

  describe('on item click', () => {
    let selectedElement: Element;

    beforeEach(() => {
      spyOn(component.selectedIndexChange, 'emit');
      selectedElement = spectator.queryAll('.tab-item')[1];
      spectator.click(selectedElement);
    });

    it('should set selected class', () => {
      expect(selectedElement).toHaveClass('selected');
    });

    it('should emit selected index', () => {
      expect(component.selectedIndexChange.emit).toHaveBeenCalledWith(1);
    });
  });
});
