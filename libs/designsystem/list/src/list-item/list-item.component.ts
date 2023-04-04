import { Component, HostBinding, Input } from '@angular/core';
import { PlatformService } from '@kirbydesign/designsystem/helpers';
import ListItemBaseComponent from './list-item.base.component';
import { Device } from './list-item.types';

@Component({
  selector: 'kirby-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['../list.component.scss', './list-item.component.scss'],
})
export class ListItemComponent extends ListItemBaseComponent {
  @Input() device: Device;

  @HostBinding('class.first')
  get isFirst() {
    return this.boundaryClass === 'first';
  }

  @HostBinding('class.last')
  get isLast() {
    return this.boundaryClass === 'last';
  }

  constructor(private _platform: PlatformService) {
    super(_platform);
  }
}
