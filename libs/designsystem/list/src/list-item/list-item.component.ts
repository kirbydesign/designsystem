import { Component, Input } from '@angular/core';
import { PlatformService } from '@kirbydesign/designsystem/helpers';
import ListItemBaseComponent from './list-item.base.component';
import { BoundaryClass, Device } from './list-item.types';

@Component({
  selector: 'kirby-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent extends ListItemBaseComponent {
  @Input() device: Device;
  @Input() boundaryClass: BoundaryClass;

  constructor(private _platform: PlatformService) {
    super(_platform);
  }
}
