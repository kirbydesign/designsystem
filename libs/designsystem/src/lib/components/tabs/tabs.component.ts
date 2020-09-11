import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { IonTabs } from '@ionic/angular';

import { TabsService } from './tabs.service';

@Component({
  selector: 'kirby-tab-bar',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements AfterViewInit {
  @ViewChild(IonTabs, { static: true }) tabs: IonTabs;

  constructor(private tabsService: TabsService) {}

  ngAfterViewInit() {
    this.tabsService.setOutlet(this.tabs.outlet);
  }
}
