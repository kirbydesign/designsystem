import {
  Component,
  Output,
  EventEmitter,
  Input,
  ContentChild,
  TemplateRef,
  OnDestroy,
  ElementRef,
  ViewChildren,
  QueryList,
  OnChanges,
} from '@angular/core';

import { ListItemTemplateDirective } from '../list/list.directive';

@Component({
  selector: 'kirby-reorder-list',
  templateUrl: './reorder-list.component.html',
  styleUrls: ['./reorder-list.component.scss'],
})
export class ReorderListComponent implements OnChanges, OnDestroy {
  @Input() items: any[];
  @Input() subItemsName: string;

  @Output() itemReorder = new EventEmitter<any>();
  @Output() subItemReorder = new EventEmitter<any>();
  @ContentChild(ListItemTemplateDirective, { static: true, read: TemplateRef })
  itemTemplate: TemplateRef<any>;
  @ContentChild(ListItemTemplateDirective, { static: true, read: TemplateRef })
  headerTemplate: TemplateRef<any>;
  @ViewChildren('reorderGroupContainer')
  reorderGroupContainer: QueryList<ElementRef>;

  private observer: MutationObserver;
  reorderActive: boolean = false;

  ngOnChanges(): void {
    if (this.items && this.items.length > 0) {
      setTimeout(() => {
        this.setupDomListener();
      });
    }
  }

  private setupDomListener() {
    let that = this;
    const callback = function(mutationsList: any) {
      for (let mutation of mutationsList) {
        if (mutation.oldValue !== mutation.target['className']) {
          that.reorderActive = mutation.target['className'].includes('reorder-list-active');
        }
      }
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

  doReorder(ev: any) {
    this.itemReorder.emit(ev);
  }

  doSubReorder(ev: any, parentItem: any) {
    ev.cancelBubble = true;
    ev.detail.parentItem = parentItem;
    this.subItemReorder.emit(ev);
  }

  getTextFromItem(item: string | any) {
    return typeof item === 'string' ? item : item.title;
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
