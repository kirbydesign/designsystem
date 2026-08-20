import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
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
import { CardComponent } from '@kirbydesign/designsystem/card';
import { ItemComponent, LabelComponent } from '@kirbydesign/designsystem/item';
import { ListItemTemplateDirective } from '@kirbydesign/designsystem/list';

import { IonBackdrop, IonReorderGroup } from '@ionic/angular/standalone';
import { ReorderEvent } from './reorder-event';

@Component({
  imports: [
    CardComponent,
    ItemComponent,
    LabelComponent,
    CommonModule,
    IonBackdrop,
    IonReorderGroup,
  ],
  selector: 'kirby-reorder-list',
  templateUrl: './reorder-list.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
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

  doReorder(ev: CustomEvent) {
    this.itemReorder.emit(new ReorderEvent(ev));
  }

  doSubReorder(ev: CustomEvent, parentItem: any) {
    this.subItemReorder.emit(new ReorderEvent(ev, parentItem));
  }

  ngOnDestroy() {
    //clean up the observer
    this.observer?.disconnect();
    delete this.observer;
  }
}
