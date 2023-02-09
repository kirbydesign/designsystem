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
 * @summary FloatingDirective is a utility that lets you declarative anchor "popup" containers to another element.
 *
 * Uses floating-ui, with this directive wraps the functionality: https://floating-ui.com/docs/getting-started
 *
 * Uses PortalDirective to enable functionality for portaling the floated content. This should be used when needed
 * and not as the default option.
 *
 * @status In development
 */
@Directive({
  selector: '[kirbyFloating]',
  standalone: true,
})
export class FloatingDirective implements OnInit, OnDestroy {
  /**
   * Reference to the element for which the host should anchor to
   * */
  @Input() public set reference(ref: ElementRef) {
    this.tearDownEventHandling();
    this._reference = ref as ElementRef;
    this.setupEventHandling();
    this.autoUpdatePosition();
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

<<<<<<< HEAD
  /**
   * Defines when the host should be displayed/hidden, i.e. click will attach a click listener to the reference
   * that makes the host toggle display. Supports multiple triggers, to provide functionality for combinations
   * like click/focus.
   * */
  @Input() public set triggers(eventTriggers: Array<TriggerEvent>) {
=======
  @Input() private set triggers(eventTriggers: Array<TriggerEvent>) {
>>>>>>> c5000c7fd (chore: change triggers to only allow for array)
    this._triggers = eventTriggers;
    this.tearDownEventHandling();
    this.setupEventHandling();
  }

<<<<<<< HEAD
  public get triggers(): Array<TriggerEvent> {
=======
  private get triggers(): Array<TriggerEvent> {
>>>>>>> c5000c7fd (chore: change triggers to only allow for array)
    return this._triggers;
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

  private autoUpdaterRef: () => void;
  private isShown: boolean = false;
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

  public constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  public ngOnInit(): void {
    this.addFloatStylingToHostElement();
    this.updateHostElementPosition();
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
<<<<<<< HEAD
      this.reference?.nativeElement.contains(event.target) && this.triggers.includes('click');
=======
      this.reference.nativeElement.contains(event.target) && this.triggers.includes('click');
>>>>>>> c5000c7fd (chore: change triggers to only allow for array)

    if (this.closeOnBackdrop && !clickedOnReferenceWithClickTriggerEnabled) {
      this.hide();
    }
  }

  private tearDownEventHandling(): void {
<<<<<<< HEAD
    this.eventListeners.forEach((eventListener) => {
      if (eventListener != null) {
        eventListener();
      }
    });
    this.eventListeners = [];
  }

  private removeAutoUpdaterRef(): void {
    if (this.autoUpdaterRef) {
      this.autoUpdaterRef();
    }
=======
    this.eventListeners.forEach(() => {
      const eventListener: () => void = this.eventListeners.pop();
      eventListener();
    });
>>>>>>> c5000c7fd (chore: change triggers to only allow for array)
  }

  public ngOnDestroy() {
    this.tearDownEventHandling();
    this.removeAutoUpdaterRef();
  }
}
