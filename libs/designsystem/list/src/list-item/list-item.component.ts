import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { IonItemSliding } from '@ionic/angular';

import { ThemeColor } from '@kirbydesign/core';
import { PlatformService } from '@kirbydesign/designsystem/helpers';

import { ListSwipeAction, ListSwipeDirection, ListSwipeEnd } from '../list-swipe-action.type';
import ListItemBaseComponent from './list-item.base.component';

export type BoundaryClass = 'first' | 'last';

@Component({
  selector: 'kirby-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['../list.component.scss', './list-item.component.scss'],
})
export class ListItemComponent extends ListItemBaseComponent implements OnInit, AfterViewInit {
  constructor(private _platform: PlatformService) {
    super(_platform);
  }
  ngOnInit() {
    this.initializeSwipeActions();
  }

  ngAfterViewInit(): void {
    if (!this.itemTemplate) {
      console.warn('No item template was provided.');
    }
  }
}
