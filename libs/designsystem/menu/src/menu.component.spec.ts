import { createHostFactory, Spectator } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { IconComponent, IconModule } from '@kirbydesign/designsystem/icon';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { FloatingDirective } from '@kirbydesign/designsystem/shared/floating';
import { CardModule } from '@kirbydesign/designsystem/card';
import { ToggleComponent } from '@kirbydesign/designsystem/toggle';
import { ItemModule } from '@kirbydesign/designsystem/item';
import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let spectator: Spectator<MenuComponent>;
  let buttonElement: HTMLButtonElement;
  let card: Element;
  let buttonIcon: IconComponent;

  const createHost = createHostFactory({
    component: MenuComponent,
    imports: [IconModule, CardModule, ItemModule],
    declarations: [
      FloatingDirective,
      MockComponent(ButtonComponent),
      MockComponent(ToggleComponent),
    ],
  });

  describe('by default', () => {
    beforeEach(() => {
      spectator = createHost<MenuComponent>(`<kirby-menu></kirby-menu>`, {});
      buttonElement = spectator.query('button');
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
        expect(buttonElement).toBeTruthy();
      });

      it('should not render button as disabled ', () => {
        expect(buttonElement.disabled).toBeFalsy();
      });

      it('should not render disabled attribute on button', () => {
        expect(buttonElement.attributes['disabled']).toBeUndefined();
      });

      it('should have type="button" attribute', () => {
        expect(buttonElement).toHaveAttribute('type', 'button');
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
          spectator.setInput('isDisabled', true);
        });

        it('should render button as disabled ', () => {
          expect(buttonElement.disabled).toBeTruthy();
        });

        it('should render disabled attribute on button', () => {
          expect(buttonElement.attributes['disabled']).toBeDefined();
        });
      });
    });

    describe('min-width', () => {
      it('should have default min-width', () => {
        expect(card).toHaveComputedStyle({ 'min-width': '240px' });
      });

      it('should have min-width set to 300px', () => {
        spectator.setInput('minWidth', 300);
        expect(card).toHaveComputedStyle({ 'min-width': '300px' });
      });
    });
  });

  describe('interaction', () => {
    beforeEach(() => {
      spectator = createHost<MenuComponent>(
        `<kirby-menu>
          <kirby-item [selectable]="true">
            <h3>Action 1</h3>
              </kirby-item>
          </kirby-menu>`,
        {}
      );
      buttonElement = spectator.query('button');
      card = spectator.query('kirby-card');
      buttonIcon = spectator.query(IconComponent);
    });

    it('should open menu when button is clicked', async () => {
      expect(card).toHaveComputedStyle({ display: 'none' });

      await spectator.click(buttonElement);

      expect(card).toHaveComputedStyle({ display: 'block' });
    });

    it('should open and then close menu when button is clicked twice', async () => {
      expect(card).toHaveComputedStyle({ display: 'none' });

      await spectator.click(buttonElement);
      expect(card).toHaveComputedStyle({ display: 'block' });

      await spectator.click(buttonElement);

      expect(card).toHaveComputedStyle({ display: 'none' });
    });

    it('should not open when the menu is disabled', async () => {
      spectator.setInput('isDisabled', true);

      await spectator.click(buttonElement);

      expect(card).toHaveComputedStyle({ display: 'none' });
    });

    it('should close the menu when pressing escape', async () => {
      await spectator.click(buttonElement);

      expect(card).toHaveComputedStyle({ display: 'block' });

      spectator.dispatchKeyboardEvent(buttonElement, 'keydown', 'Escape');

      expect(card).toHaveComputedStyle({ display: 'none' });
    });

    it('should not close the menu when pressing escape and closeOnEscapeKey is false', async () => {
      spectator.setInput('closeOnEscapeKey', false);

      await spectator.click(buttonElement);

      expect(card).toHaveComputedStyle({ display: 'block' });

      spectator.dispatchKeyboardEvent(buttonElement, 'keydown', 'Escape');

      expect(card).toHaveComputedStyle({ display: 'block' });
    });

    it('should not close when selecting an item and closeOnSelect is false', async () => {
      spectator.setInput('closeOnSelect', false);
      expect(card).toHaveComputedStyle({ display: 'none' });

      await spectator.click(buttonElement);
      expect(card).toHaveComputedStyle({ display: 'block' });

      await spectator.click(spectator.query('kirby-item'));
      expect(card).toHaveComputedStyle({ display: 'block' });
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
    });

    it('should render a custom button if provided', () => {
      expect(buttonIcon).toHaveAttribute('name', 'menu-outline');
    });
  });

  describe('advanced items', () => {
    let toggle: ToggleComponent;
    beforeEach(() => {
      spectator = createHost<MenuComponent>(
        `<kirby-menu [closeOnSelect]="false">
        <kirby-item>
          <kirby-icon name="notification" slot="start"></kirby-icon>
          <h3>Title</h3>
          <kirby-toggle slot="end" checked="true" (checkedChange)="toggled()"></kirby-toggle>
        </kirby-item>
      </kirby-menu>`,
        {}
      );
      buttonElement = spectator.query('button');
      toggle = spectator.query(ToggleComponent);
    });

    it('should render an advanced kirby item, with interactive elements inside', () => {
      expect(toggle).toBeTruthy();
    });
  });

  describe('trigger: default(click)', () => {
    beforeEach(() => {
      spectator = createHost<MenuComponent>(
        `<kirby-menu>
          <kirby-item [selectable]="true">
            <h3>Action 1</h3>
              </kirby-item>
          </kirby-menu>`,
        {}
      );
      buttonElement = spectator.query('button');
      card = spectator.query('kirby-card');
      buttonIcon = spectator.query(IconComponent);
    });

    it('should open menu when button is clicked', async () => {
      expect(card).toHaveComputedStyle({ display: 'none' });

      await spectator.click(buttonElement);

      expect(card).toHaveComputedStyle({ display: 'block' });
    });
  });

  describe('trigger: hover', () => {
    beforeEach(() => {
      spectator = createHost<MenuComponent>(
        `<kirby-menu [triggers]="['hover']">
          <kirby-item [selectable]="true">
            <h3>Action 1</h3>
              </kirby-item>
          </kirby-menu>`,
        {}
      );

      buttonElement = spectator.query('button');
      card = spectator.query('kirby-card');
      buttonIcon = spectator.query(IconComponent);
    });

    it('should open menu when button is hovered', () => {
      expect(card).toHaveComputedStyle({ display: 'none' });

      spectator.dispatchMouseEvent(buttonElement, 'mouseenter');

      expect(card).toHaveComputedStyle({ display: 'block' });
    });
  });
});
