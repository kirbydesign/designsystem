import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PlatformService } from '@kirbydesign/designsystem/helpers';
import ListItemBaseComponent from '../list-item.base.component';

@Component({
  selector: 'kirby-list-item-swipe',
  templateUrl: './list-item-swipe.component.html',
  styleUrls: ['../../list.component.scss', './list-item-swipe.component.scss'],
})
export class ListItemSwipeComponent extends ListItemBaseComponent implements OnInit, AfterViewInit {
  constructor(_platform: PlatformService) {
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
