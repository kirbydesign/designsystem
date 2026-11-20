import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { CardComponent } from '@kirbydesign/designsystem/card';
import { ItemComponent, LabelComponent } from '@kirbydesign/designsystem/item';
import { ListItemTemplateDirective } from '@kirbydesign/designsystem/list';

import { IonReorderGroup } from '@ionic/angular';
import { ReorderEvent } from './reorder-event';

@Component({
  imports: [CardComponent, ItemComponent, LabelComponent, CommonModule, IonReorderGroup],
  selector: 'kirby-reorder-list',
  templateUrl: './reorder-list.component.html',
  styleUrls: ['./reorder-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ReorderListComponent {
  @Input() items: any[];
  @Input() subItemsName: string;
  @Input() getItemTextDefault: (item: any) => string;

  @Output() itemReorder = new EventEmitter<ReorderEvent>();
  @Output() subItemReorder = new EventEmitter<ReorderEvent>();

  @ContentChild(ListItemTemplateDirective, { static: true, read: TemplateRef })
  itemTemplate: TemplateRef<any>;

  doReorder(ev: CustomEvent) {
    this.itemReorder.emit(new ReorderEvent(ev));
  }

  doSubReorder(ev: CustomEvent, parentItem: any) {
    this.subItemReorder.emit(new ReorderEvent(ev, parentItem));
  }
}
