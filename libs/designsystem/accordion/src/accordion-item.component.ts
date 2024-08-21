import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  Renderer2,
} from '@angular/core';
import { ListComponent } from '@kirbydesign/designsystem/list';

// Counter for generating unique element ids
let uniqueId = 0;

@Component({
  selector: 'kirby-accordion-item',
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('isExpanded', [
      state('true', style({ height: '*', visibility: 'visible' })),
      state('false', style({ height: '0px', visibility: 'hidden' })),
      transition('true <=> false', animate('0.2s')),
    ]),
  ],
})
export class AccordionItemComponent implements OnChanges, AfterContentInit {
  @Input() title: string;
  @Input() isExpanded: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() disabledTitle: string;
  @Input() hasPadding: boolean = true;
  @Output() toggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ContentChildren(ListComponent) kirbyListChildren: QueryList<ListComponent>;

  constructor(private renderer: Renderer2) {}

  ngAfterContentInit(): void {
    if (this.kirbyListChildren.length > 0) {
      // this.hasPadding = false;
      // this.kirbyListChildren.forEach((child) => {
      //   child.shape = 'none';
      //   this.renderer.addClass(child.elem.nativeElement, 'transparent');
      // });
    }
  }

  ngOnChanges(): void {
    if (this.isDisabled) {
      this.isExpanded = false;
    }
  }

  getTitle() {
    if (this.isDisabled && !!this.disabledTitle) {
      return this.disabledTitle;
    } else {
      return this.title;
    }
  }

  _onToggleExpanded(event: UIEvent) {
    event.preventDefault();
    if (this.isDisabled) return;

    this.isExpanded = !this.isExpanded && !this.isDisabled;
    this.toggle.emit(this.isExpanded);
  }

  // IDs used for a11y labelling
  _titleId = `kirby-accordion-item-title-${++uniqueId}`;
  _contentId = `kirby-accordion-item-content-${uniqueId}`;
}
