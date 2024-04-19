import { ChangeDetectionStrategy, Component, HostListener, ViewChild } from '@angular/core';
import { IonList } from '@ionic/angular/standalone';
import { elementHasAncestor } from '@kirbydesign/designsystem/helpers';

@Component({
  selector: 'kirby-list-experimental',
  templateUrl: './list-experimental.component.html',
  styleUrls: ['./list-experimental.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListExperimentalComponent {
  @ViewChild(IonList, { static: true }) list: IonList;

  @HostListener('click', ['$event'])
  closeAllSlidingItems(e: MouseEvent) {
    if (elementHasAncestor(e.target as HTMLElement, 'ion-item-option', 'ion-list')) {
      this.list.closeSlidingItems();
    }
  }
}
