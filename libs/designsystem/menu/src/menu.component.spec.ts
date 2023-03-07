import { createHostFactory, Spectator } from '@ngneat/spectator';
import { MockComponent, MockDirectives } from 'ng-mocks';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { FloatingDirective } from '@kirbydesign/designsystem/shared/floating';
import { MenuComponent } from './menu.component';

describe('ActionListComponent', () => {
  describe('by default', () => {
    const createHost = createHostFactory({
      component: MenuComponent,
      declarations: [MockDirectives(FloatingDirective), MockComponent(ButtonComponent)],
    });

    let spectator: Spectator<MenuComponent>;
    let buttonElement: HTMLButtonElement;
    let card: Element;
    let buttonIcon: IconComponent;

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

      it('should have dark theme by default', () => {
        expect(spectator.component.themeColor).toEqual('dark');
      });

      it('should have small buttonIcon size by default', () => {
        expect(spectator.component.iconSize).toEqual('sm');
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
        expect(spectator.component.closeOnSelect).toBeTruthy();
      });

      it('should have close on escape key be true as default', () => {
        expect(spectator.component.closeOnSelect).toBeTruthy();
      });

      it('should have close on backdrop be true as default', () => {
        expect(spectator.component.closeOnSelect).toBeTruthy();
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

      it('should have size from component', () => {
        expect(buttonIcon).toHaveAttribute('size', spectator.component.iconSize);
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
  });
});
