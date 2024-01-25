import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import {
  autoPlacement,
  autoUpdate,
  computePosition,
  ComputePositionConfig,
  flip,
  Middleware,
  offset,
  Placement,
  shift,
  Strategy,
} from '@floating-ui/dom';
import { DesignTokenHelper } from '@kirbydesign/core';
import { from } from 'rxjs';
import { PortalDirective } from '@kirbydesign/designsystem/shared/portal';

export type TriggerEvent = 'hover' | 'click' | 'focus';

export enum FloatingOffset {
  none = 0,
  small = 4,
  medium = 8,
}

export enum OutletSelector {
  tag = 'tag',
  id = 'id',
  class = 'class',
  name = 'name',
}

export interface PortalOutletConfig {
  selector: OutletSelector;
  value: string;
}

interface EventMethods {
  event: string;
  method: () => void;
}

type EventListenerDisposeFn = () => void;

/**
 * @summary FloatingDirective is a utility that lets you declarative anchor "popup" containers to another element.
 *
 * Uses floating-ui, with this directive wraps the functionality: https://floating-ui.com/docs/getting-started
 *
 * Uses PortalDirective to enable functionality for portaling the floated content. This should be used when needed
 * and not as the default option.
 */
@Directive({
  selector: '[kirbyFloating]',
  providers: [PortalDirective],
  hostDirectives: [PortalDirective],
  standalone: true,
})
export class FloatingDirective implements OnInit, OnDestroy {
  /**
   * Reference to the element for which the host should anchor to
   * */
  @Input() public set reference(ref: ElementRef<HTMLElement> | undefined) {
    this.tearDownReferenceElementEventHandling();
    this._reference = ref;
    this.setupEventHandling();
    this.autoUpdatePosition();
  }

  public get reference(): ElementRef<HTMLElement> | undefined {
    return this._reference;
  }

  /**
   * How the host should be placed relative to the reference. Can be affected by middleware
   * */
  @Input() public set placement(placement: Placement) {
    this._placement = placement;
    this.updateHostElementPosition();
  }

  public get placement() {
    return this._placement;
  }

  /**
   * The strategy for how the host should be positioned.
   * */
  @Input() public set strategy(strategy: Strategy) {
    this._strategy = strategy;
    this.updateHostElementPosition();
  }

  public get strategy(): Strategy {
    return this._strategy;
  }

  /**
   * Defines when the host should be displayed/hidden, i.e. click will attach a click listener to the reference
   * that makes the host toggle display. Supports multiple triggers, to provide functionality for combinations
   * like click/focus.
   * */
  @Input() public set triggers(eventTriggers: Array<TriggerEvent>) {
    this._triggers = eventTriggers;
    this.tearDownReferenceElementEventHandling();
    this.setupEventHandling();
  }

  public get triggers(): Array<TriggerEvent> {
    return this._triggers;
  }

  /**
   * The HTMLElement for which the content should portal into.
   * Providing an outlet enables the portal, if nothing is provided, the provided strategy is used.
   * This should be used when there's issues with the stacking context, and not as a default option.
   * */
  @Input() public set DOMPortalOutlet(outlet: HTMLElement | undefined) {
    this._providedPortalOutlet = outlet;
    this.portalDirective.outlet =
      this.DOMPortalOutlet ?? this.getOutletElement(this.portalOutletConfig);
  }

  public get DOMPortalOutlet(): HTMLElement | undefined {
    return this._providedPortalOutlet;
  }

  /**
   * Defines how to automatically find and assign DOMPortalOutlet if none is provided in DOMPortalOutlet.
   * If nothing is provided here and in DOMPortalOutlet, the provided strategy is used
   * */
  @Input() public set portalOutletConfig(config: PortalOutletConfig | undefined) {
    this._portalOutletConfig = config;

    if (!this.DOMPortalOutlet) {
      this.portalDirective.outlet = this.getOutletElement(config);
    }
  }

  public get portalOutletConfig(): PortalOutletConfig | undefined {
    return this._portalOutletConfig;
  }

  /**
   * Prevent host from being toggled if set.
   * */
  @Input() public isDisabled: boolean = false;

  /**
   * Displaces the floating element from its core placement along the specified axes.
   * */
  @Input() public offset: FloatingOffset = FloatingOffset.none;

  /**
   * Moves the floating element along the specified axes in order to keep it in view.
   * This does not always work as expected, so don't "just" set it.
   * */
  @Input() public shift: boolean = false;

  /**
   * Chooses the placement that has the most space available automatically.
   * */
  @Input() public autoPlacement: boolean = false;

  /**
   * Enables hiding the host by events. See variable names.
   * */
  @Input() public closeOnSelect: boolean = true;
  @Input() public closeOnEscapeKey: boolean = true;
  @Input() public closeOnBackdrop: boolean = true;

  /**
   * Enables the option to be notified when the host changes display. The new display value is provided.
   * */
  @Output() public displayChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostListener('document:keydown.escape', ['$event'])
  public onEscapeKeyPressed(): void {
    if (this.closeOnEscapeKey) {
      this.hide();
    }
  }

  private _placement: Placement = 'bottom-start';

  private _strategy: Strategy = 'absolute';

  private _providedPortalOutlet: HTMLElement | undefined;

  private _portalOutletConfig: PortalOutletConfig | undefined;

  private _triggers: Array<TriggerEvent> = ['click'];

  private _reference: ElementRef<HTMLElement> | undefined;

  private autoUpdaterRef: () => void;
  private isShown: boolean = false;
  private referenceEventListenerDisposeFns: EventListenerDisposeFn[] = [];
  private documentClickEventListenerDisposeFn: EventListenerDisposeFn;
  private hostClickEventListenerDisposeFn: EventListenerDisposeFn;
  private triggerEventMap: Map<TriggerEvent, EventMethods[]> = new Map([
    ['click', [{ event: 'click', method: this.toggleShow.bind(this) }]],
    [
      'hover',
      [
        { event: 'mouseenter', method: this.show.bind(this) },
        { event: 'mouseleave', method: this.hide.bind(this) },
      ],
    ],
    [
      'focus',
      [
        { event: 'focus', method: this.show.bind(this) },
        { event: 'blur', method: this.hide.bind(this) },
      ],
    ],
  ]);

  private HTMLElements: {
    [key in OutletSelector | 'default']: (value?: string) => Array<Element> | null;
  } = {
    id: (value) => Array.of(document.getElementById(value)),
    class: (value) => Array.from(document.getElementsByClassName(value)),
    name: (value) => Array.from(document.getElementsByName(value)),
    tag: (value) => Array.from(document.getElementsByTagName(value)),
    default: () => null,
  };

  public constructor(
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private portalDirective: PortalDirective
  ) {}

  public ngOnInit(): void {
    this.addFloatStylingToHostElement();
    this.updateHostElementPosition();
  }

  /* Should be accessible for programmatically setting display */
  public show(): void {
    if (this.isDisabled) {
      return;
    }

    this.autoUpdatePosition();

    this.attachDocumentClickEventHandler();
    this.attachHostClickEventHandler();
    this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'block');
    this.isShown = true;
    this.displayChanged.emit(this.isShown);
  }

  /* Should be accessible for programmatically setting display */
  public hide(): void {
    if (this.isDisabled || !this.isShown) {
      return;
    }

    this.removeAutoUpdaterRef();

    this.tearDownDocumentClickEventHandling();
    this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'none');
    this.isShown = false;
    this.displayChanged.emit(this.isShown);
  }

  /* Should be accessible for programmatically setting display */
  public toggleShow(): void {
    if (this.isShown) {
      this.hide();
    } else {
      this.show();
    }
  }

  private addFloatStylingToHostElement(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'left', `0px`);
    this.renderer.setStyle(this.elementRef.nativeElement, 'top', `0px`);
    this.renderer.setStyle(this.elementRef.nativeElement, 'position', this.strategy);
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'z-index',
      DesignTokenHelper.zLayer('popover')
    );
    this.setDisplayStyling();
  }

  private setDisplayStyling(): void {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'display',
      this.isShown ? `block` : `none`
    );
  }

  private updateHostElementPosition(): void {
    if (!this.reference || !this.isShown) {
      return;
    }

    const config: ComputePositionConfig = {
      placement: this.placement,
      middleware: this.getMiddlewareConfig(),
      strategy: this.strategy,
    } as ComputePositionConfig;

    from(
      computePosition(this.reference?.nativeElement, this.elementRef.nativeElement, config)
    ).subscribe(({ x, y }) => this.setPositionStylingOnHostElement(x, y));
  }

  private getMiddlewareConfig(): Array<Middleware | null | undefined | false> {
    const middleware: Array<Middleware | null | undefined | false> = [];
    middleware.push(offset(this.offset));
    middleware.push(flip());

    if (this.shift) {
      middleware.push(shift({ padding: parseInt(DesignTokenHelper.size('s')) }));
    }

    if (this.autoPlacement) {
      middleware.push(autoPlacement());
    }

    return middleware;
  }

  private autoUpdatePosition(): void {
    this.removeAutoUpdaterRef();

    if (!this.reference) {
      return;
    }

    this.autoUpdaterRef = autoUpdate(
      this.reference?.nativeElement,
      this.elementRef.nativeElement,
      this.updateHostElementPosition.bind(this)
    );
  }

  private setPositionStylingOnHostElement(xPosition: number, yPosition: number): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'left', `${xPosition}px`);
    this.renderer.setStyle(this.elementRef.nativeElement, 'top', `${yPosition}px`);
    this.setDisplayStyling();
  }

  private setupEventHandling(): void {
    if (!this.reference || !this.triggers) {
      return;
    }

    this.triggers.forEach((trigger: TriggerEvent) =>
      this.attachTriggerEventToReferenceElement(trigger)
    );
  }

  private attachDocumentClickEventHandler(): void {
    if (this.documentClickEventListenerDisposeFn) {
      return;
    }

    this.documentClickEventListenerDisposeFn = this.renderer.listen(
      'document',
      'mousedown',
      (event) => this.handleClickOutsideHostElement(event)
    );
  }

  private attachHostClickEventHandler(): void {
    if (this.hostClickEventListenerDisposeFn || !this.closeOnSelect) {
      return;
    }

    this.hostClickEventListenerDisposeFn = this.renderer.listen(
      this.elementRef.nativeElement,
      'click',
      () => this.handleClickInsideHostElement()
    );
  }

  private attachTriggerEventToReferenceElement(trigger: TriggerEvent): void {
    const events: EventMethods[] | undefined = this.triggerEventMap.get(trigger);

    if (!events) {
      throw new Error(`${trigger} is missing event definition(s)`);
    }

    events.forEach((event: EventMethods) => {
      const eventListenerDisposeFn: EventListenerDisposeFn = this.renderer.listen(
        this.reference?.nativeElement,
        event.event,
        event.method
      );
      this.referenceEventListenerDisposeFns.push(eventListenerDisposeFn);
    });
  }

  private handleClickInsideHostElement(): void {
    if (this.closeOnSelect) {
      this.hide();
    }
  }

  private handleClickOutsideHostElement(event: Event): void {
    if (event.target instanceof Node) {
      const clickedOnHost: boolean = this.elementRef.nativeElement.contains(event.target);
      if (clickedOnHost) return;

      const clickedOnReferenceWithClickTriggerEnabled: boolean =
        this.reference?.nativeElement.contains(event.target) && this.triggers.includes('click');

      if (this.closeOnBackdrop && !clickedOnReferenceWithClickTriggerEnabled) {
        this.hide();
      }
    }
  }

  private getOutletElement(config: PortalOutletConfig | undefined): HTMLElement | null {
    if (!config || !config.selector || !config.value) {
      return null;
    }

    const elements: Array<Element> | null = this.getHTMLElements(config);

    if (!elements || elements.length === 0) {
      throw Error(`Could not locate HTMLElement for ${config.selector}. Did you misspell it?`);
    }

    if (elements.length > 1) {
      throw Error(
        `Multiple HTMLElements found for ${config.selector}.
         This can lead to unintended behaviours. Provide an unique outlet`
      );
    }

    return elements[0] as HTMLElement;
  }

  private getHTMLElements(config: PortalOutletConfig | undefined): Array<Element> | null {
    return (
      this.HTMLElements[config.selector](config.value) || this.HTMLElements['default'](config.value)
    );
  }

  private tearDownReferenceElementEventHandling(): void {
    this.referenceEventListenerDisposeFns.forEach(
      (eventListenerDisposeFunction: EventListenerDisposeFn) => {
        if (eventListenerDisposeFunction != null) {
          eventListenerDisposeFunction();
        }
      }
    );
    this.referenceEventListenerDisposeFns = [];
  }

  private tearDownDocumentClickEventHandling(): void {
    if (this.documentClickEventListenerDisposeFn) {
      this.documentClickEventListenerDisposeFn();
      this.documentClickEventListenerDisposeFn = null;
    }

    if (this.hostClickEventListenerDisposeFn) {
      this.hostClickEventListenerDisposeFn();
      this.hostClickEventListenerDisposeFn = null;
    }
  }

  private removeAutoUpdaterRef(): void {
    if (this.autoUpdaterRef) {
      this.autoUpdaterRef();
    }
  }

  public ngOnDestroy() {
    this.tearDownDocumentClickEventHandling();
    this.tearDownReferenceElementEventHandling();
    this.removeAutoUpdaterRef();
  }
}
