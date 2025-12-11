import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { FloatingDirective } from '@kirbydesign/designsystem/shared/floating';
import { TestHelper } from '@kirbydesign/designsystem/testing';
import { CheckboxComponent } from '@kirbydesign/designsystem/checkbox';
import { ToggleComponent } from '@kirbydesign/designsystem/toggle';
import { ItemComponent } from '@kirbydesign/designsystem/item';
import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let spectator: SpectatorHost<MenuComponent>;
  let triggerButton: HTMLButtonElement;
  let card: Element;
  let buttonIcon: IconComponent;
  let items: NodeListOf<Element>;

  const createHost = createHostFactory({
    component: MenuComponent,
    imports: [
      IconComponent,
      ItemComponent,
      TestHelper.ionicModuleForTest,
      ToggleComponent,
      CheckboxComponent,
      FloatingDirective,
      MockComponent(ButtonComponent),
    ],
  });
  describe('by default', () => {
    beforeEach(() => {
      spectator = createHost<MenuComponent>(
        `<kirby-menu [isDisabled]="isDisabled" [minWidth]="minWidth"></kirby-menu>`,
        {}
      );
      triggerButton = spectator.query('button');
      card = spectator.query('kirby-card');
      buttonIcon = spectator.query(IconComponent);
    });

    describe('component', () => {
      it('should create', () => {
        expect(spectator.component).toBeTruthy();
      });

      it('should not be disabled by default', () => {
        expect(spectator.component.isDisabled).toBeFalsy();
      });

      it('should have size button size md by default', () => {
        expect(spectator.component.buttonSize).toEqual('md');
      });

      it('should have placement bottom-start as default', () => {
        expect(spectator.component.placement).toEqual('bottom-start');
      });

      it('should have autoPlacement disabled by default', () => {
        expect(spectator.component.autoPlacement).toBeFalsy();
      });

      it('should have close on select be true as default', () => {
        expect(spectator.component.closeOnSelect).toBeTrue();
      });

      it('should have close on escape key be true as default', () => {
        expect(spectator.component.closeOnEscapeKey).toBeTrue();
      });

      it('should have close on backdrop be true as default', () => {
        expect(spectator.component.closeOnBackdrop).toBeTrue();
      });
    });

    describe('button', () => {
      it('should render', () => {
        expect(triggerButton).toBeTruthy();
      });

      it('should not render button as disabled ', () => {
        expect(triggerButton.disabled).toBeFalsy();
      });

      it('should not render disabled attribute on button', () => {
        expect(triggerButton.attributes['disabled']).toBeUndefined();
      });

      it('should have type="button" attribute', () => {
        expect(triggerButton).toHaveAttribute('type', 'button');
      });

      it('should add aria attributes to trigger button', () => {
        expect(triggerButton.getAttribute('aria-controls')).toEqual(card.id);
        expect(triggerButton.getAttribute('aria-haspopup')).toEqual('true');
        expect(triggerButton.getAttribute('aria-label')).toEqual('More');
      });

      it('should add aria attributes to menu for trigger button', () => {
        expect(card.getAttribute('aria-labelledby')).toEqual(triggerButton.id);
      });

      it('should add aria attributes to menu for trigger button', () => {
        expect(card.getAttribute('aria-labelledby')).toEqual(triggerButton.id);
      });
    });

    describe('button-icon', () => {
      it('should render', () => {
        expect(buttonIcon).toBeTruthy();
      });

      it('should have icon more', () => {
        expect(buttonIcon).toHaveAttribute('name', 'more');
      });
    });

    describe('content', () => {
      it('should exist', () => {
        expect(card).toBeTruthy();
      });

      it('should have floatingDirective', () => {
        expect(card.attributes['kirbyFloating']).toBeDefined();
      });
    });

    describe('when', () => {
      describe('component configured with isDisabled set to true', () => {
        beforeEach(() => {
          spectator.setHostInput('isDisabled', true);
        });

        it('should render button as disabled ', () => {
          expect(triggerButton.disabled).toBeTruthy();
        });

        it('should render disabled attribute on button', () => {
          expect(triggerButton.attributes['disabled']).toBeDefined();
        });
      });
    });

    describe('min-width', () => {
      it('should have default min-width', () => {
        expect(card).toHaveComputedStyle({ 'min-width': '240px' });
      });

      it('should have min-width set to 300px', () => {
        spectator.setHostInput('minWidth', 300);
        expect(card).toHaveComputedStyle({ 'min-width': '300px' });
      });
    });
  });

  describe('button with custom aria', () => {
    it('should overwrite aria-label on trigger button if aria-label is set on menu', () => {
      spectator = createHost<MenuComponent>(
        `<kirby-menu aria-label='Custom aria label'></kirby-menu>`,
        {}
      );
      triggerButton = spectator.query('button');
      expect(triggerButton.getAttribute('aria-label')).toEqual('Custom aria label');
      expect(spectator.hostElement.getAttribute('aria-label')).toEqual(null);
    });
    it('should overwrite aria-labelledby on trigger button if aria-labelledby is set on menu', () => {
      spectator = createHost<MenuComponent>(
        `<kirby-menu aria-labelledby='Custom labelledBy'></kirby-menu>`,
        {}
      );
      triggerButton = spectator.query('button');
      expect(triggerButton.getAttribute('aria-labelledby')).toEqual('Custom labelledBy');
      expect(spectator.hostElement.getAttribute('aria-labelledBy')).toEqual(null);
    });
    it('should overwrite aria-label on custom button if aria-label is set on menu', () => {
      spectator = createHost<MenuComponent>(
        `<kirby-menu aria-label='Custom aria label'>
          <button kirby-button [size]="'md'" type="button" [attentionLevel]="'3'" aria-label="button aria label">
            <kirby-icon [name]="'menu-outline'"></kirby-icon>
          </button>
        </kirby-menu>`,
        {}
      );
      triggerButton = spectator.query('button');
      expect(triggerButton.getAttribute('aria-label')).toEqual('Custom aria label');
      expect(spectator.hostElement.getAttribute('aria-label')).toEqual(null);
    });
  });

  describe('interaction', () => {
    beforeEach(() => {
      spectator = createHost(
        `<kirby-menu [closeOnEscapeKey]="closeOnEscapeKey" [closeOnSelect]="closeOnSelect" [isDisabled]="isDisabled">
          <kirby-item>
            <p>Action 1</p>
              </kirby-item>
          </kirby-menu>`,
        { hostProps: { closeOnEscapeKey: true, closeOnSelect: true, isDisabled: false } }
      );
      triggerButton = spectator.query('button');
      card = spectator.query('kirby-card');
      buttonIcon = spectator.query(IconComponent);
    });

    it('should open menu when button is clicked', async () => {
      expect(card).toHaveComputedStyle({ display: 'none' });

      await spectator.click(triggerButton);

      expect(card).toHaveComputedStyle({ display: 'block' });
    });

    it('should open and then close menu when button is clicked twice', async () => {
      expect(card).toHaveComputedStyle({ display: 'none' });

      await spectator.click(triggerButton);
      expect(card).toHaveComputedStyle({ display: 'block' });

      await spectator.click(triggerButton);

      expect(card).toHaveComputedStyle({ display: 'none' });
    });

    it('should not open when the menu is disabled', async () => {
      spectator.setHostInput('isDisabled', true);

      await spectator.click(triggerButton);

      expect(card).toHaveComputedStyle({ display: 'none' });
    });

    it('should close the menu when pressing escape', async () => {
      spectator.setHostInput('closeOnEscapeKey', true);
      await spectator.click(triggerButton);

      expect(card).toHaveComputedStyle({ display: 'block' });

      spectator.dispatchKeyboardEvent(triggerButton, 'keydown', 'Escape');

      expect(card).toHaveComputedStyle({ display: 'none' });
    });

    it('should not close the menu when pressing escape and closeOnEscapeKey is false', async () => {
      spectator.setHostInput('closeOnEscapeKey', false);

      await spectator.click(triggerButton);

      expect(card).toHaveComputedStyle({ display: 'block' });

      spectator.dispatchKeyboardEvent(triggerButton, 'keydown', 'Escape');

      expect(card).toHaveComputedStyle({ display: 'block' });
    });

    it('should not close when selecting an item and closeOnSelect is false', async () => {
      spectator.setHostInput('closeOnSelect', false);
      expect(card).toHaveComputedStyle({ display: 'none' });

      await spectator.click(triggerButton);
      expect(card).toHaveComputedStyle({ display: 'block' });

      await spectator.click(spectator.query('kirby-item'));
      expect(card).toHaveComputedStyle({ display: 'block' });
    });
  });

  describe('interaction with items that are conditionally shown', () => {
    describe('inside if statement', () => {
      beforeEach(async () => {
        spectator = createHost(
          `<kirby-menu>
            @if (show) {
              <kirby-item>
                <p>Action 1</p>
              </kirby-item>
            }
          </kirby-menu>`,
          { hostProps: { show: false } }
        );
        triggerButton = spectator.query('button');
        spectator.setHostInput({ show: true });

        await spectator.click(triggerButton); //Open menu
        spectator.detectChanges();
      });

      it('should make item selectable', async () => {
        const ionItem = spectator.query('ion-item');
        await TestHelper.whenReady(ionItem);
        const selectableIonItem = ionItem.shadowRoot.querySelector('button'); //"button" only exist if item is selectable

        expect(selectableIonItem).toBeTruthy();
      });
    });

    describe('inside for loop', () => {
      beforeEach(async () => {
        const items = ['Item 1', 'Item 2', 'Item 3'];
        spectator = createHost(
          `<kirby-menu>
          @for(item of items; track item) {
            <kirby-item>            
              <kirby-icon name="add" slot="start" />
              {{item}}                               
            </kirby-item>
          }
        </kirby-menu>`,
          { hostProps: { items } }
        );
        triggerButton = spectator.query('button');
        spectator.setHostInput({ show: true });

        await spectator.click(triggerButton); //Open menu
        spectator.detectChanges();
      });

      it('should make items selectable', async () => {
        const ionItems = spectator.queryAll('ion-item');
        await TestHelper.whenReady(ionItems[0]);
        ionItems.forEach((ionItem) => {
          const selectableIonItem = ionItem.shadowRoot.querySelector('button'); //"button" only exist if item is selectable

          expect(selectableIonItem).toBeTruthy();
        });
      });
    });
  });

  describe('custom button', () => {
    beforeEach(() => {
      spectator = createHost<MenuComponent>(
        `<kirby-menu>
          <button kirby-button [size]="'md'" type="button" [attentionLevel]="'3'">
            <kirby-icon [name]="'menu-outline'"></kirby-icon>
          </button>
        </kirby-menu>
        `,
        {}
      );
      buttonIcon = spectator.query(IconComponent);
      triggerButton = spectator.query('button');
      card = spectator.query('kirby-card');
    });

    it('should render a custom button if provided', () => {
      expect(buttonIcon).toHaveAttribute('name', 'menu-outline');
    });

    it('should add aria attributes to custom button', () => {
      expect(triggerButton.getAttribute('aria-controls')).toEqual(card.id);
      expect(triggerButton.getAttribute('aria-haspopup')).toEqual('true');
      expect(triggerButton.getAttribute('aria-label')).toEqual('More');
    });

    it('should add aria attributes to menu for custom button', () => {
      expect(card.getAttribute('aria-labelledby')).toEqual(triggerButton.id);
    });
  });

  describe('trigger: default(click)', () => {
    beforeEach(async () => {
      spectator = createHost<MenuComponent>(
        `<kirby-menu>
          <kirby-item>
            <p>Action 1</p>
              </kirby-item>
          </kirby-menu>`,
        {}
      );
      triggerButton = spectator.query('button');
      card = spectator.query('kirby-card');
      buttonIcon = spectator.query(IconComponent);
      items = card.querySelectorAll('ion-item');
      await TestHelper.whenReady(items);
    });

    it('should open menu when button is clicked', async () => {
      expect(card).toHaveComputedStyle({ display: 'none' });

      await spectator.click(triggerButton);

      expect(card).toHaveComputedStyle({ display: 'block' });
    });

    it('should set focus on first item when button is clicked', async () => {
      await spectator.click(triggerButton);

      expect(document.activeElement).toEqual(items[0]);
    });
  });

  describe('trigger: hover', () => {
    beforeEach(() => {
      spectator = createHost<MenuComponent>(
        `<kirby-menu [triggers]="['hover']">
        <kirby-item>
          <p>Action 1</p>
            </kirby-item>
        </kirby-menu>`,
        {}
      );

      triggerButton = spectator.query('button');
      card = spectator.query('kirby-card');
      buttonIcon = spectator.query(IconComponent);
    });

    it('should open menu when button is hovered', () => {
      expect(card).toHaveComputedStyle({ display: 'none' });

      spectator.dispatchMouseEvent(triggerButton, 'mouseenter');

      expect(card).toHaveComputedStyle({ display: 'block' });
    });
  });

  describe('keyboard interaction', () => {
    describe('with selectable items', () => {
      beforeEach(async () => {
        spectator = createHost<MenuComponent>(
          `<kirby-menu>
            <kirby-item>
              <p>First Action</p>
            </kirby-item>
            <kirby-item>
              <p>Second Action</p>
            </kirby-item>
            <kirby-item>
              <p>Second Action 2</p>
            </kirby-item>
            <kirby-item>
              <p>Third Action</p>
            </kirby-item>
          </kirby-menu>`,
          {}
        );
        triggerButton = spectator.query('button');
        card = spectator.query('kirby-card');
        items = card.querySelectorAll('ion-item');
        await TestHelper.whenReady(items);
      });

      it('should add wrapping button to ion-item by default', () => {
        items.forEach((item) => expect(item.shadowRoot.querySelector('button')).toExist());
      });

      it('should set focus on first item when opened by enter', async () => {
        spectator.keyboard.pressKey('Enter', triggerButton, 'keydown');

        expect(document.activeElement).toEqual(items[0]);
      });

      it('should set focus to native button within item', () => {
        spectator.keyboard.pressKey('Enter', triggerButton, 'keydown');

        expect(document.activeElement.shadowRoot.activeElement).toEqual(
          items[0].shadowRoot.querySelector('button')
        );
      });

      it('should set focus on first item when opened by arrow down', () => {
        spectator.keyboard.pressKey('ArrowDown', triggerButton, 'keydown');

        expect(document.activeElement).toEqual(items[0]);
      });

      it('should set focus on first item when opened by space', async () => {
        spectator.keyboard.pressKey(' ', triggerButton, 'keydown');

        expect(document.activeElement).toEqual(items[0]);
      });

      it('should set focus on last item when opened by arrow up', async () => {
        spectator.keyboard.pressKey('ArrowUp', triggerButton, 'keydown');

        expect(document.activeElement).toEqual(items[items.length - 1]);
      });

      it('should set focus to next item when navigating by arrow down', async () => {
        spectator.keyboard.pressKey('Enter', triggerButton, 'keydown');
        spectator.keyboard.pressKey('ArrowDown', card, 'keydown');

        expect(document.activeElement).toEqual(items[1]);
      });

      it('should set focus to previous item when navigating by arrow up', async () => {
        spectator.keyboard.pressKey('Enter', triggerButton, 'keydown');
        spectator.keyboard.pressKey('ArrowDown', card, 'keydown');
        spectator.keyboard.pressKey('ArrowUp', card, 'keydown');

        expect(document.activeElement).toEqual(items[0]);
      });

      it('should set focus to first item when focus is on the last item and navigating by arrow down', async () => {
        spectator.keyboard.pressKey('ArrowUp', triggerButton, 'keydown');
        expect(document.activeElement).toEqual(items[items.length - 1]);

        spectator.keyboard.pressKey('ArrowDown', card, 'keydown');

        expect(document.activeElement).toEqual(items[0]);
      });

      it('should set focus to last item when focus is on the first item and navigating by arrow up', async () => {
        spectator.keyboard.pressKey('ArrowDown', triggerButton, 'keydown');
        expect(document.activeElement).toEqual(items[0]);

        spectator.keyboard.pressKey('ArrowUp', card, 'keydown');

        expect(document.activeElement).toEqual(items[items.length - 1]);
      });

      it('should set focus to last item when navigating by end', async () => {
        spectator.keyboard.pressKey('ArrowDown', triggerButton, 'keydown');
        spectator.keyboard.pressKey('End', card, 'keydown');

        expect(document.activeElement).toEqual(items[items.length - 1]);
      });

      it('should set focus to first item when navigating by home', async () => {
        spectator.keyboard.pressKey('ArrowUp', triggerButton, 'keydown');
        spectator.keyboard.pressKey('Home', card, 'keydown');

        expect(document.activeElement).toEqual(items[0]);
      });

      it('should set focus to trigger button when selecting item', async () => {
        spectator.keyboard.pressKey('Enter', triggerButton, 'keydown');

        const focusedNativeButton = document.activeElement.shadowRoot.activeElement;

        spectator.click(focusedNativeButton); //Using click instead of enter here since browsers natively interprete enter as a click event
        expect(document.activeElement).toEqual(triggerButton);
      });

      it('should set focus to trigger button when pressing escape', async () => {
        spectator.keyboard.pressKey('Enter', triggerButton, 'keydown');

        spectator.keyboard.pressKey('Escape', card, 'keydown'); //Using click instead of enter here since browsers natively interprete enter as a click event
        expect(document.activeElement).toEqual(triggerButton);
      });

      it('should set focus to "third action" when pressing "t"', () => {
        spectator.keyboard.pressKey('Enter', triggerButton, 'keydown');
        spectator.keyboard.pressKey('t', card, 'keydown');

        expect(document.activeElement).toEqual(items[3]);
      });

      it('should set focus to "second action" when pressing "s"', () => {
        spectator.keyboard.pressKey('Enter', triggerButton, 'keydown');
        spectator.keyboard.pressKey('s', card, 'keydown');

        expect(document.activeElement).toEqual(items[1]);
      });

      it('should set focus to "second action 2" when pressing "s" twice', () => {
        spectator.keyboard.pressKey('Enter', triggerButton, 'keydown');
        spectator.keyboard.pressKey('s', card, 'keydown');
        spectator.keyboard.pressKey('s', card, 'keydown');

        expect(document.activeElement).toEqual(items[2]);
      });

      it('should return focus to "second action" when pressing "s" three times', () => {
        spectator.keyboard.pressKey('Enter', triggerButton, 'keydown');
        spectator.keyboard.pressKey('s', card, 'keydown');
        spectator.keyboard.pressKey('s', card, 'keydown');
        spectator.keyboard.pressKey('s', card, 'keydown');

        expect(document.activeElement).toEqual(items[1]);
      });
    });
    describe('with interactive element inside items', () => {
      describe('keyboard interaction', () => {
        beforeEach(async () => {
          spectator = createHost<MenuComponent>(
            `<kirby-menu>
              <kirby-item>
                <kirby-checkbox></kirby-checkbox>
              </kirby-item>
              <kirby-item>
                <kirby-toggle></kirby-toggle>
              </kirby-item>
            </kirby-menu>`,
            {}
          );
          triggerButton = spectator.query('button');
          card = spectator.query('kirby-card');
          items = card.querySelectorAll('ion-item');
          await TestHelper.whenReady(items);
        });

        it('should set focus on first interactive element inside item when opened by enter', async () => {
          spectator.keyboard.pressKey('Enter', triggerButton, 'keydown');

          expect(document.activeElement).toEqual(items[0].querySelector('ion-checkbox'));
        });

        it('should set focus on last interactive element inside item when opened by arrow up', async () => {
          spectator.keyboard.pressKey('ArrowUp', triggerButton, 'keydown');

          expect(document.activeElement).toEqual(items[1].querySelector('ion-toggle'));
        });

        it('should set focus on next interactive element inside item when navigating by arrow down', async () => {
          spectator.keyboard.pressKey('ArrowDown', triggerButton, 'keydown');
          spectator.keyboard.pressKey('ArrowDown', card, 'keydown');

          expect(document.activeElement).toEqual(items[1].querySelector('ion-toggle'));
        });
      });
    });
  });
});
