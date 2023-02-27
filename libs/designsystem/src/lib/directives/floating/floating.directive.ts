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
  offset,
  shift,
  Strategy,
} from '@floating-ui/dom';
import { ComputePositionConfig, Middleware, Placement } from '@floating-ui/core/src/types';
import { DesignTokenHelper } from '@kirbydesign/core';
import { PortalDirective } from '@kirbydesign/designsystem/shared/src/portal';
import { from } from 'rxjs';

export type TriggerEvent = 'hover' | 'click' | 'focus';

export enum FloatingOffset {
  none = 0,
  small = 5,
  medium = 10,
  large = 15,
}

interface EventMethods {
  event: string;
  method: () => void;
}

type EventListener = () => void;

/**
 * @summary FloatingDirective is a utility that lets you declaratively anchor "popup" containers to another element.
 *
 * Uses floating-ui, with this directive wraps the functionality: https://floating-ui.com/docs/getting-started
 *
 * @status In development
 */
@Directive({
  selector: '[kirbyFloating]',
  hostDirectives: [PortalDirective],
  providers: [PortalDirective],
  standalone: true,
})
export class FloatingDirective implements OnInit, OnDestroy {
  /**
   * Reference to the element for which the host should anchor to
   * */
  @Input() public set reference(ref: ElementRef) {
    this.tearDownEventHandling();
    this._reference = ref;
    this.setupEventHandling();
  }

  public get reference(): ElementRef | undefined {
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
    this.tearDownEventHandling();
    this.setupEventHandling();
  }

  public get triggers(): Array<TriggerEvent> {
    return this._triggers;
  }

  @Input() public set DOMPortalOutlet(outlet: HTMLElement | undefined) {
    this.portalDirective.outlet = outlet;
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

  @Output() public displayChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostListener('document:keydown.escape', ['$event'])
  public onEscapeKeyPressed(): void {
    if (this.closeOnEscapeKey) {
      this.hide();
    }
  }

  @HostListener('document:mousedown', ['$event'])
  public onMouseClick(event: Event): void {
    const clickedOnHost: boolean = this.elementRef.nativeElement.contains(event.target);
    if (clickedOnHost) {
      this.handleClickInsideHostElement();
    } else {
      this.handleClickOutsideHostElement(event);
    }
  }

  private _placement: Placement = 'bottom-start';

  private _strategy: Strategy = 'absolute';

  private _triggers: Array<TriggerEvent> = ['click'];

  private _reference: ElementRef | undefined;

  private isShown: boolean = false;
  private config: ComputePositionConfig;
  private eventListeners: EventListener[] = [];
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

  public constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private portalDirective: PortalDirective
  ) {}

  public ngOnInit(): void {
    this.addFloatStylingToHostElement();
    this.updateHostElementPosition();
    autoUpdate(
      this.reference?.nativeElement,
      this.elementRef.nativeElement,
      this.updateHostElementPosition.bind(this)
    );
  }

  /* Should be accessible for programmatically setting display */
  public show(): void {
    if (this.isDisabled) {
      return;
    }

    this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'block');
    this.isShown = true;
    this.displayChanged.emit(this.isShown);
  }

  /* Should be accessible for programmatically setting display */
  public hide(): void {
    if (this.isDisabled) {
      return;
    }

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
  }

  private updateHostElementPosition(): void {
    if (!this.reference) {
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

    if (this.shift) {
      middleware.push(shift());
    }

    if (this.autoPlacement) {
      middleware.push(autoPlacement());
    }

    return middleware;
  }

  private setPositionStylingOnHostElement(xPosition: number, yPosition: number): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'left', `${xPosition}px`);
    this.renderer.setStyle(this.elementRef.nativeElement, 'top', `${yPosition}px`);
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'display',
      this.isShown ? `block` : `none`
    );
  }

  private setupEventHandling(): void {
    if (!this.reference || !this.triggers) {
      return;
    }

    this.triggers.forEach((trigger: TriggerEvent) =>
      this.attachTriggerEventToReferenceElement(trigger)
    );
  }

  private attachTriggerEventToReferenceElement(trigger: TriggerEvent): void {
    const events: EventMethods[] | undefined = this.triggerEventMap.get(trigger);

    if (!events) {
      throw new Error(`${trigger} is missing event definition(s)`);
    }

    events.forEach((event: EventMethods) => {
      const eventListener: () => void = this.renderer.listen(
        this.reference?.nativeElement,
        event.event,
        event.method
      );
      this.eventListeners.push(eventListener);
    });
  }

  private handleClickInsideHostElement(): void {
    if (this.closeOnSelect) {
      this.hide();
    }
  }

  private handleClickOutsideHostElement(event: Event): void {
    const clickedOnReferenceWithClickTriggerEnabled: boolean =
      this.reference?.nativeElement.contains(event.target) && this.triggers.includes('click');

    if (this.closeOnBackdrop && !clickedOnReferenceWithClickTriggerEnabled) {
      this.hide();
    }
  }

  private tearDownEventHandling(): void {
    this.eventListeners.forEach(() => {
      const eventListener: EventListener | undefined = this.eventListeners.pop();

      if (eventListener != null) {
        eventListener();
      }
    });
  }

  public ngOnDestroy() {
    this.tearDownEventHandling();
  }
}
