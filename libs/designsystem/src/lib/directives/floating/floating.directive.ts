import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
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

@Directive({
  selector: '[kirbyFloating]',
  standalone: true,
})
export class FloatingDirective implements OnInit, OnDestroy {
  @Input() private set reference(ref: ElementRef) {
    this.tearDownEventHandling();
    this._reference = ref;
    this.setupEventHandling();
  }

  private get reference(): ElementRef {
    return this._reference;
  }

  @Input() private set placement(placement: Placement) {
    this._placement = placement;
    this.updateHostElementPosition();
  }

  private get placement() {
    return this._placement;
  }

  @Input() private set strategy(strategy: Strategy) {
    this._strategy = strategy;
    this.updateHostElementPosition();
  }

  private get strategy() {
    return this._strategy;
  }

  @Input() private set triggers(eventTriggers: Array<TriggerEvent>) {
    this._triggers = eventTriggers;
    this.tearDownEventHandling();
    this.setupEventHandling();
  }

  private get triggers(): Array<TriggerEvent> {
    return this._triggers;
  }

  @Input() private isDisabled: boolean = false;

  // Displaces the floating element from its core placement along the specified axes.
  @Input() private offset: FloatingOffset = FloatingOffset.none;

  // Moves the floating element along the specified axes in order to keep it in view.
  // This does not always work as expected, so don't "just" set it.
  @Input() private shift: boolean = false;

  // Chooses the placement that has the most space available automatically.
  @Input() private autoPlacement: boolean = false;

  @Input() private closeOnSelect: boolean = true;
  @Input() private closeOnEscapeKey: boolean = true;
  @Input() private closeOnBackdrop: boolean = true;

  @HostListener('document:keydown.escape', ['$event']) public onEscapeKeyPressed() {
    if (this.closeOnEscapeKey) {
      this.hide();
    }
  }

  @HostListener('document:mousedown', ['$event'])
  public onMouseClick(event): void {
    const clickedOnHost: boolean = this.elementRef.nativeElement.contains(event.target);
    clickedOnHost ? this.handleClickInsideHostElement() : this.handleClickOutsideHostElement(event);
  }

  private _placement: Placement = 'bottom-start';
  private _strategy: Strategy = 'absolute';
  private _triggers: Array<TriggerEvent> = ['click'];
  private _reference: ElementRef;

  private isShown: boolean = false;
  private config: ComputePositionConfig;
  private eventListeners: (() => void)[] = [];
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
    autoUpdate(
      this.reference.nativeElement,
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
  }

  /* Should be accessible for programmatically setting display */
  public hide(): void {
    if (this.isDisabled) {
      return;
    }

    this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'none');
    this.isShown = false;
  }

  /* Should be accessible for programmatically setting display */
  public toggleShow(): void {
    this.isShown ? this.hide() : this.show();
  }

  private addFloatStylingToHostElement(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'left', `0px`);
    this.renderer.setStyle(this.elementRef.nativeElement, 'top', `0px`);
    this.renderer.setStyle(this.elementRef.nativeElement, 'position', `absolute`);
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'z-index',
      DesignTokenHelper.zLayer('popover')
    );
  }

  private updateHostElementPosition(): void {
    this.config = {
      placement: this.placement,
      middleware: this.getMiddlewareConfig(),
      strategy: this.strategy,
    } as ComputePositionConfig;

    computePosition(this.reference.nativeElement, this.elementRef.nativeElement, this.config).then(
      ({ x, y }) => this.setPositionStylingOnHostElement(x, y)
    );
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

  private setPositionStylingOnHostElement(xPosition: number, yPosition: number) {
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
    const events: EventMethods[] = this.triggerEventMap.get(trigger);

    if (!events) {
      throw new Error(`${trigger} is missing event definition(s)`);
    }

    events.forEach((event: EventMethods) => {
      const eventListener: () => void = this.renderer.listen(
        this.reference.nativeElement,
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
      this.reference.nativeElement.contains(event.target) && this.triggers.includes('click');

    if (this.closeOnBackdrop && !clickedOnReferenceWithClickTriggerEnabled) {
      this.hide();
    }
  }

  private tearDownEventHandling(): void {
    this.eventListeners.forEach(() => {
      const eventListener: () => void = this.eventListeners.pop();
      eventListener();
    });
  }

  public ngOnDestroy() {
    this.tearDownEventHandling();
  }
}
