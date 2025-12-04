import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  Output,
} from '@angular/core';
import type { KirbyAccordionItemElement } from '@kirbydesign/core/accordion-item';
// START_OF_AUTO_GENERATED_COMPONENT
// AUTO-GENERATED - Any missing type imports can be added manually above, but do not change component source
@Component({
  selector: 'kirby-accordion-item',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KirbyAccordionItemComponent {
  private el: KirbyAccordionItemElement;

  constructor(
    private e: ElementRef<KirbyAccordionItemElement>,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {
    this.el = this.e.nativeElement;
    this.cdr.detach();

    this.el.addEventListener('toggle', (e: Event) => {
      this.toggle.emit(e);
    });
  }

  @Input()
  set title(v: string) {
    this.ngZone.runOutsideAngular(() => (this.el.title = v));
  }

  get title(): string {
    return this.el.title;
  }

  @Input()
  set isExpanded(v: boolean) {
    this.ngZone.runOutsideAngular(() => (this.el.isExpanded = v));
  }

  get isExpanded(): boolean {
    return this.el.isExpanded;
  }

  @Input()
  set isDisabled(v: boolean) {
    this.ngZone.runOutsideAngular(() => (this.el.isDisabled = v));
  }

  get isDisabled(): boolean {
    return this.el.isDisabled;
  }

  @Input()
  set disabledTitle(v: string) {
    this.ngZone.runOutsideAngular(() => (this.el.disabledTitle = v));
  }

  get disabledTitle(): string {
    return this.el.disabledTitle;
  }

  @Input()
  set hasPadding(v: boolean) {
    this.ngZone.runOutsideAngular(() => (this.el.hasPadding = v));
  }

  get hasPadding(): boolean {
    return this.el.hasPadding;
  }

  @Input()
  set headingLevel(v: 1 | 2 | 3 | 4 | 5 | 6 | undefined) {
    this.ngZone.runOutsideAngular(() => (this.el.headingLevel = v));
  }

  get headingLevel(): 1 | 2 | 3 | 4 | 5 | 6 | undefined {
    return this.el.headingLevel;
  }
  @Output() toggle = new EventEmitter<unknown>();
}
