import {
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  QueryList,
  TemplateRef,
  ViewChildren,
} from '@angular/core';

import { ItemReorderEventDetail } from '@ionic/core';
import { ListItemTemplateDirective } from '../list/list.directive';

import { ReorderEvent } from './reorder-event';

@Component({
  selector: 'kirby-reorder-list',
  templateUrl: './reorder-list.component.html',
  styleUrls: ['./reorder-list.component.scss'],
})
export class ReorderListComponent implements OnChanges, OnDestroy {
  @Input() items: any[];
  @Input() subItemsName: string;
  @Input() getItemTextDefault: (item: any) => string;

  @Output() itemReorder = new EventEmitter<ReorderEvent>();
  @Output() subItemReorder = new EventEmitter<ReorderEvent>();

  @ContentChild(ListItemTemplateDirective, { static: true, read: TemplateRef })
  itemTemplate: TemplateRef<any>;
  @ViewChildren('reorderGroupContainer')
  reorderGroupContainer: QueryList<ElementRef>;

  private observer: MutationObserver;
  reorderActive: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(): void {
    if (this.items && this.items.length > 0) {
      setTimeout(() => {
        this.setupDomListener();
      });
    }
  }

  private setupDomListener() {
    const callback = (mutationsList: any) => {
      for (const mutation of mutationsList) {
        if (mutation.oldValue !== mutation.target['className']) {
          this.reorderActive = mutation.target['className'].includes('reorder-list-active');
        }
      }
      this.cdr.detectChanges();
    };
    this.observer = new MutationObserver(callback);

    this.reorderGroupContainer.forEach((div: ElementRef) => {
      this.observer.observe(div.nativeElement, {
        attributes: true,
        attributeFilter: ['class'],
        attributeOldValue: true,
        childList: false,
        subtree: true,
      });
    });
  }

  doReorder(ev: Event) {
    const customEvent = ev as CustomEvent<ItemReorderEventDetail>;
    this.itemReorder.emit(new ReorderEvent(customEvent));
  }

  doSubReorder(ev: Event, parentItem: any) {
    const customEvent = ev as CustomEvent<ItemReorderEventDetail>;
    this.subItemReorder.emit(new ReorderEvent(customEvent, parentItem));
  }

  ngOnDestroy() {
    //clean up the observer
    this.observer && this.observer.disconnect();
    delete this.observer;
  }
}
