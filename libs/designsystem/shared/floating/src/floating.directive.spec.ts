import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator';
import { PortalDirective } from '@kirbydesign/designsystem/shared/portal';
import { PortalOutletConfig, TriggerEvent } from '@kirbydesign/designsystem/shared/floating';

import * as floatingUi from '@floating-ui/dom';
import { Strategy } from '@floating-ui/dom';
import { Placement } from '@floating-ui/core/src/types';
import { DesignTokenHelper } from '@kirbydesign/core';
import { FloatingDirective, OutletSelector } from './floating.directive';
import any = jasmine.any;

@Component({
  template: `
    <div #floatingElement></div>
    <div
      #hostElement
      kirbyFloating
      [reference]="floatingElementRef"
      [isDisabled]="isDisabled"
      [closeOnEscapeKey]="closeOnEscapeKey"
      [closeOnSelect]="closeOnSelect"
      [closeOnBackdrop]="closeOnBackdrop"
      [strategy]="strategy"
      [placement]="placement"
    ></div>
    <div #clickTarget></div>
    <div #idTarget id="idTarget"></div>
    <div #classTarget class="classTarget"></div>
    <div #nameTarget name="nameTarget"></div>
    <pre #tagTarget></pre>
  `,
  imports: [FloatingDirective],
  standalone: true,
})
class FloatingTestComponent {
  @ViewChild('floatingElement', { static: true }) public floatingElementRef: ElementRef;
  @ViewChild('hostElement', { static: true }) public hostElementRef: ElementRef;
  @ViewChild('clickTarget', { static: true }) public clickTargetRef: ElementRef;
  @ViewChild('idTarget', { static: true }) public idTargetRef: ElementRef;
  @ViewChild('classTarget', { static: true }) public classTargetRef: ElementRef;
  @ViewChild('nameTarget', { static: true }) public nameTargetRef: ElementRef;
  @ViewChild('tagTarget', { static: true }) public tagTargetRef: ElementRef;
  @ViewChild(FloatingDirective, { static: true }) public floatingDirective: FloatingDirective;

  /** Start values set to match directive */
  @Input() public isDisabled: boolean = false;
  @Input() public closeOnEscapeKey: boolean = true;
  @Input() public closeOnSelect: boolean = true;
  @Input() public closeOnBackdrop: boolean = true;
  @Input() public strategy: Strategy = 'absolute';
  @Input() public placement: Placement = 'bottom-start';
}

describe('FloatingDirective', () => {
  let spectator: Spectator<FloatingTestComponent>;
  let component: FloatingTestComponent;
  let directive: FloatingDirective;

  const createComponent = createComponentFactory({
    component: FloatingTestComponent,
    providers: [mockProvider(PortalDirective, {})],
    detectChanges: false,
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
    directive = component.floatingDirective;
  });

  it('should be created', () => {
    expect(spectator.component).toBeTruthy();
  });

  describe('input', () => {
    describe('reference', () => {
      it('should set', () => {
        directive.reference = component.floatingElementRef;
        expect(directive.reference).toEqual(component.floatingElementRef);
      });

      it('should not add event listeners when only reference is set without triggers', () => {
        directive.triggers = null;
        directive.reference = component.floatingElementRef;
        expect(directive['referenceEventListenerDisposeFns']).toHaveLength(0);
      });
    });

    describe('placement', () => {
      it('should set', () => {
        const placement: Placement = 'top-start';
        directive.placement = placement;
        expect(directive['_placement']).toEqual(placement);
      });
    });

    describe('strategy', () => {
      it('should set', () => {
        const strategy: Strategy = 'absolute';
        directive.strategy = strategy;
        expect(directive['_strategy']).toEqual(strategy);
      });
    });

    describe('triggers', () => {
      it('should set', () => {
        const eventTriggers: Array<TriggerEvent> = ['hover'];
        directive.triggers = eventTriggers;
        expect(directive['_triggers']).toEqual(eventTriggers);
      });

      it('should not add event listeners when only triggers is set without reference', () => {
        directive.reference = null;
        directive.triggers = ['hover'];
        expect(directive['referenceEventListenerDisposeFns']).toHaveLength(0);
      });

      it('should add event listeners for click event when reference and triggers is set', () => {
        directive.triggers = ['click'];
        directive.reference = component.floatingElementRef;
        expect(directive['referenceEventListenerDisposeFns']).toHaveLength(1);
      });

      it('should add event listeners for hover event when reference and triggers is set', () => {
        directive.triggers = ['hover'];
        directive.reference = component.floatingElementRef;
        expect(directive['referenceEventListenerDisposeFns']).toHaveLength(2);
      });

      it('should add event listeners for click event when reference and triggers is set', () => {
        directive.triggers = ['focus'];
        directive.reference = component.floatingElementRef;
        expect(directive['referenceEventListenerDisposeFns']).toHaveLength(2);
      });
    });

    describe('portalOutletConfig', () => {
      it('should not change outlet, if outlet is set by providedPortalOutlet', () => {
        const config: PortalOutletConfig = {
          selector: OutletSelector.tag,
          value: 'tagTarget',
        };

        const expectedPortalOutlet: HTMLElement = component.classTargetRef.nativeElement;
        directive['_providedPortalOutlet'] = expectedPortalOutlet;
        directive.portalOutletConfig = config;
        expect(directive.DOMPortalOutlet).toEqual(expectedPortalOutlet);
      });

      it('should set outlet to tagTarget', () => {
        const config: PortalOutletConfig = {
          selector: OutletSelector.tag,
          value: 'pre',
        };
        const expectedPortalOutlet: HTMLElement = component.tagTargetRef.nativeElement;
        directive.portalOutletConfig = config;
        expect(directive['portalDirective'].outlet).toEqual(expectedPortalOutlet);
      });

      it('should set outlet to classTarget', () => {
        const config: PortalOutletConfig = {
          selector: OutletSelector.class,
          value: 'classTarget',
        };
        const expectedPortalOutlet: HTMLElement = component.classTargetRef.nativeElement;
        directive.portalOutletConfig = config;
        expect(directive['portalDirective'].outlet).toEqual(expectedPortalOutlet);
      });

      it('should set outlet to idTarget', () => {
        const config: PortalOutletConfig = {
          selector: OutletSelector.id,
          value: 'idTarget',
        };
        const expectedPortalOutlet: HTMLElement = component.idTargetRef.nativeElement;
        directive.portalOutletConfig = config;
        expect(directive['portalDirective'].outlet).toEqual(expectedPortalOutlet);
      });

      it('should set outlet to nameTarget', () => {
        const config: PortalOutletConfig = {
          selector: OutletSelector.name,
          value: 'nameTarget',
        };
        const expectedPortalOutlet: HTMLElement = component.nameTargetRef.nativeElement;
        directive.portalOutletConfig = config;
        expect(directive['portalDirective'].outlet).toEqual(expectedPortalOutlet);
      });
    });
  });

  describe('methods', () => {
    describe('ngOnInit', () => {
      let autoUpdateFuncSpy;
      let computePositionFuncSpy;

      beforeEach(() => {
        autoUpdateFuncSpy = jasmine.createSpy('autoUpdate').and.returnValue(null);
        spyOnProperty(floatingUi, 'autoUpdate', 'get').and.returnValue(autoUpdateFuncSpy);

        computePositionFuncSpy = jasmine
          .createSpy('computePosition')
          .and.returnValue(new Promise(null));
        spyOnProperty(floatingUi, 'computePosition', 'get').and.returnValue(computePositionFuncSpy);
      });

      describe('add styling', () => {
        it('should add style left to host element', () => {
          directive.ngOnInit();
          expect(component.hostElementRef.nativeElement).toHaveComputedStyle({ left: '0px' });
        });

        it('should add style top to host element', () => {
          directive.ngOnInit();
          expect(component.hostElementRef.nativeElement).toHaveComputedStyle({ top: '0px' });
        });

        it('should add style position from strategy input to host element - strategy absolute', () => {
          const strategy: Strategy = 'absolute';
          spectator.setInput('strategy', strategy);
          directive.ngOnInit();
          expect(component.hostElementRef.nativeElement).toHaveComputedStyle({
            position: strategy,
          });
        });

        it('should add style position from strategy input to host element - strategy fixed', () => {
          const strategy: Strategy = 'fixed';
          spectator.setInput('strategy', strategy);
          directive.ngOnInit();
          expect(component.hostElementRef.nativeElement).toHaveComputedStyle({
            position: strategy,
          });
        });

        it('should add style top to host element', () => {
          directive.ngOnInit();
          expect(component.hostElementRef.nativeElement).toHaveComputedStyle({
            'z-index': DesignTokenHelper.zLayer('popover'),
          });
        });
      });
      describe('autoUpdatePosition', () => {
        it('should call floating-ui autoUpdate', () => {
          spectator.detectChanges();
          directive.ngOnInit();

          expect(autoUpdateFuncSpy).toHaveBeenCalledWith(
            component.floatingElementRef.nativeElement,
            component.hostElementRef.nativeElement,
            any(Function)
          );
        });
      });
      describe('updateHostElementPosition', () => {
        it('should call computePosition with correct config', () => {
          const placement: Placement = 'top-end';
          spectator.setInput('placement', placement);

          const strategy: Strategy = 'fixed';
          spectator.setInput('strategy', strategy);

          spectator.detectChanges();
          directive.ngOnInit();

          expect(computePositionFuncSpy).toHaveBeenCalledWith(
            component.floatingElementRef.nativeElement,
            component.hostElementRef.nativeElement,
            any(Object)
          );
        });
      });
    });

    describe('onEscapeKeyPressed', () => {
      it('should by default make host element not shown', () => {
        directive.onEscapeKeyPressed();
        expect(directive['isShown']).toBeFalse();
      });

      it('should change isShown when not disabled and is closeOnEscapeKey', () => {
        directive['isShown'] = true;
        spectator.setInput('isDisabled', false);
        spectator.setInput('closeOnEscapeKey', true);
        directive.onEscapeKeyPressed();
        expect(directive['isShown']).toBeFalse();
      });

      it('should not change isShown when disabled - isShown start value true', () => {
        const isShown: boolean = true;
        directive['isShown'] = isShown;
        spectator.setInput('isDisabled', true);
        directive.onEscapeKeyPressed();
        expect(directive['isShown']).toEqual(isShown);
      });

      it('should not change isShown when disabled - isShown start value false', () => {
        const isShown: boolean = false;
        directive['isShown'] = isShown;
        spectator.setInput('isDisabled', true);
        directive.onEscapeKeyPressed();
        expect(directive['isShown']).toEqual(isShown);
      });

      it('should not change isShown when closeOnEscapeKey false - isShown start value true', () => {
        const isShown: boolean = true;
        directive['isShown'] = isShown;
        spectator.setInput('closeOnEscapeKey', false);
        directive.onEscapeKeyPressed();
        expect(directive['isShown']).toEqual(isShown);
      });

      it('should not change isShown when closeOnEscapeKey false - isShown start value false', () => {
        const isShown: boolean = false;
        directive['isShown'] = isShown;
        spectator.setInput('closeOnEscapeKey', false);
        directive.onEscapeKeyPressed();
        expect(directive['isShown']).toEqual(isShown);
      });
    });

    describe('onMouseClick', () => {
      describe('click inside host', () => {
        let event: Event;

        beforeEach(() => {
          event = { target: component.hostElementRef.nativeElement } as Event;
        });

        it('should change isShown when closeOnSelect true', () => {
          const isShown: boolean = true;
          directive['isShown'] = isShown;
          spectator.setInput('closeOnSelect', true);
          directive['onDocumentClickWhileHostShown'](event);
          expect(directive['isShown']).toBeFalse();
        });

        it('should not change isShown when closeOnSelect false - isShown start value false', () => {
          const isShown: boolean = false;
          directive['isShown'] = isShown;
          spectator.setInput('closeOnSelect', false);
          directive['onDocumentClickWhileHostShown'](event);
          expect(directive['isShown']).toEqual(isShown);
        });

        it('should not change isShown when closeOnSelect false - isShown start value true', () => {
          const isShown: boolean = true;
          directive['isShown'] = isShown;
          spectator.setInput('closeOnSelect', false);
          directive['onDocumentClickWhileHostShown'](event);
          expect(directive['isShown']).toEqual(isShown);
        });
      });

      describe('click outside host', () => {
        let event: Event;

        beforeEach(() => {
          event = { target: component.clickTargetRef.nativeElement } as Event;
        });

        it('should change isShown when closeOnSelect true', () => {
          const isShown: boolean = true;
          directive['isShown'] = isShown;
          spectator.setInput('closeOnBackdrop', true);
          directive['onDocumentClickWhileHostShown'](event);
          expect(directive['isShown']).toBeFalse();
        });

        it('should not change isShown when closeOnSelect false - isShown start value false', () => {
          const isShown: boolean = false;
          directive['isShown'] = isShown;
          spectator.setInput('closeOnBackdrop', false);
          directive['onDocumentClickWhileHostShown'](event);
          expect(directive['isShown']).toEqual(isShown);
        });

        it('should not change isShown when closeOnSelect false - isShown start value true', () => {
          const isShown: boolean = true;
          directive['isShown'] = isShown;
          spectator.setInput('closeOnBackdrop', false);
          directive['onDocumentClickWhileHostShown'](event);
          expect(directive['isShown']).toEqual(isShown);
        });
      });
    });

    describe('show', () => {
      it('should set isShown to true by default', () => {
        directive['isShown'] = false;
        spectator.setInput('isDisabled', false);
        directive.show();
        expect(directive['isShown']).toBeTrue();
      });

      it('should not change isShown when isDisabled is set - isShown false', () => {
        const isShown: boolean = false;
        directive['isShown'] = isShown;
        spectator.setInput('isDisabled', true);
        directive.show();
        expect(directive['isShown']).toEqual(isShown);
      });

      it('should not change isShown when isDisabled is set - isShown true', () => {
        const isShown: boolean = true;
        directive['isShown'] = isShown;
        spectator.setInput('isDisabled', true);
        directive.show();
        expect(directive['isShown']).toEqual(isShown);
      });

      it('should set display to block', () => {
        directive.show();
        expect(component.hostElementRef.nativeElement).toHaveComputedStyle({ display: 'block' });
      });

      it('Should emit displayChanged', () => {
        let output: boolean;
        directive.displayChanged.subscribe((value) => (output = value));
        directive.show();
        expect(output).toEqual(true);
      });
    });

    describe('hide', () => {
      it('should set isShown to false by default', () => {
        directive['isShown'] = true;
        spectator.setInput('isDisabled', false);
        directive.hide();
        expect(directive['isShown']).toBeFalse();
      });

      it('should not change isShown when isDisabled is set - isShown false', () => {
        const isShown: boolean = false;
        directive['isShown'] = isShown;
        spectator.setInput('isDisabled', true);
        directive.hide();
        expect(directive['isShown']).toEqual(isShown);
      });

      it('should not change isShown when isDisabled is set - isShown true', () => {
        const isShown: boolean = true;
        directive['isShown'] = isShown;
        spectator.setInput('isDisabled', true);
        directive.hide();
        expect(directive['isShown']).toEqual(isShown);
      });

      it('should set display to none', () => {
        directive.hide();
        expect(component.hostElementRef.nativeElement).toHaveComputedStyle({ display: 'none' });
      });

      it('Should emit displayChanged', () => {
        let output: boolean;
        directive.displayChanged.subscribe((value) => (output = value));
        directive.hide();
        expect(output).toEqual(false);
      });
    });

    describe('toggleShow', () => {
      it('should set isShown to true if false', () => {
        const isShown: boolean = false;
        directive['isShown'] = isShown;
        directive.toggleShow();
        expect(directive['isShown']).toEqual(!isShown);
      });

      it('should set isShown to false if true', () => {
        const isShown: boolean = true;
        directive['isShown'] = isShown;
        directive.toggleShow();
        expect(directive['isShown']).toEqual(!isShown);
      });
    });

    describe('setPositionStyleOnHostElement', () => {
      let xPosition: number;
      let yPosition: number;

      beforeEach(() => {
        xPosition = 10;
        yPosition = 25;
      });

      it('should set style left', () => {
        directive['setPositionStylingOnHostElement'](xPosition, yPosition);
        expect(component.hostElementRef.nativeElement).toHaveComputedStyle({
          left: `${xPosition}px`,
        });
      });

      it('should set style top', () => {
        directive['setPositionStylingOnHostElement'](xPosition, yPosition);
        expect(component.hostElementRef.nativeElement).toHaveComputedStyle({
          top: `${yPosition}px`,
        });
      });

      it('should set style display to block when isShown is true', () => {
        directive['isShown'] = true;
        directive['setPositionStylingOnHostElement'](xPosition, yPosition);
        expect(component.hostElementRef.nativeElement).toHaveComputedStyle({
          display: `block`,
        });
      });

      it('should set style display to block when isShown is true', () => {
        directive['isShown'] = false;
        directive['setPositionStylingOnHostElement'](xPosition, yPosition);
        expect(component.hostElementRef.nativeElement).toHaveComputedStyle({
          display: `none`,
        });
      });
    });
  });

  describe('event handling', () => {
    it('should not have any event listeners as default', () => {
      expect(directive['eventListeners']).toHaveLength(0);
    });
  });
});
