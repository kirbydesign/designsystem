import { createHostFactory, Spectator } from '@ngneat/spectator';
import { MockComponent, MockDirectives } from 'ng-mocks';
import { IconComponent } from '@kirbydesign/designsystem/icon';
import { ButtonComponent, ButtonSize } from '../button/button.component';
import { FloatingDirective } from '../../src/lib/directives';
import { ActionListComponent } from './action-list.component';

describe('ActionListComponent', () => {
  describe('by default', () => {
    const createHost = createHostFactory({
      component: ActionListComponent,
      declarations: [MockDirectives(FloatingDirective), MockComponent(ButtonComponent)],
    });

    let spectator: Spectator<ActionListComponent>;
    let buttonElement: HTMLButtonElement;
    let card: Element;
    let buttonIcon: IconComponent;

    const expectedAttentionLevel = '3';

    beforeEach(() => {
      spectator = createHost<ActionListComponent>(`<kirby-action-list></kirby-action-list>`, {});
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

      it('should have attention level 3 as default', () => {
        expect(spectator.component.attentionLevel).toEqual(expectedAttentionLevel);
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

    describe('list', () => {
      it('should exist', () => {
        expect(card).toBeTruthy();
      });

      it('should have floatingDirective', () => {
        expect(card.attributes['kirbyFloating']).toBeDefined();
      });
    });

    describe('when', () => {
      describe('component configured with attentionLevel', () => {
        it('should render button with correct attentionLevel', () => {
          spectator.setInput('attentionLevel', '1');
          spectator.detectChanges();
          const button: ButtonComponent = spectator.query(ButtonComponent);
          expect(button.attentionLevel).toEqual('1');
        });
      });

      describe('component configured with buttonSize', () => {
        it('should render button with correct buttonSize', () => {
          spectator.setInput('buttonSize', ButtonSize.LG);
          spectator.detectChanges();
          const button = spectator.query(ButtonComponent);
          expect(button.size).toEqual(ButtonSize.LG);
        });
      });

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
