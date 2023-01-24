import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { autoUpdate, computePosition } from '@floating-ui/dom';
import { ComputePositionConfig, Placement } from '@floating-ui/core/src/types';
import { DesignTokenHelper } from '@kirbydesign/core';

export type TriggerEvent = 'hover' | 'click';

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

  @Input() private set triggers(eventTriggers: Array<TriggerEvent> | TriggerEvent) {
    this._triggers = eventTriggers;
    this.tearDownEventHandling();
    this.setupEventHandling();
  }

  private get triggers(): Array<TriggerEvent> | TriggerEvent {
    return this._triggers;
  }

  private _placement: Placement;
  private _triggers: Array<TriggerEvent> | TriggerEvent;
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

  public ngOnDestroy() {
    this.tearDownEventHandling();
  }

  /* Should be accessible for programmatically setting display */
  public show(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'block');
    this.isShown = true;
  }

  /* Should be accessible for programmatically setting display */
  public hide(): void {
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
      placement: this.placement ?? 'bottom-start',
      middleware: [],
      strategy: 'absolute',
    } as ComputePositionConfig;

    computePosition(this.reference.nativeElement, this.elementRef.nativeElement, this.config).then(
      ({ x, y }) => this.setPositionStylingOnHostElement(x, y)
    );
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

    if (Array.isArray(this.triggers)) {
      (this.triggers as Array<TriggerEvent>).forEach((trigger: TriggerEvent) =>
        this.attachTriggerEventToReferenceElement(trigger)
      );
    } else {
      this.attachTriggerEventToReferenceElement(this.triggers);
    }
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

  private tearDownEventHandling(): void {
    this.eventListeners.forEach(() => {
      const eventListener: () => void = this.eventListeners.pop();
      eventListener();
    });
  }
}
