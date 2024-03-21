import { AfterViewInit, Component, HostBinding, OnDestroy, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular/standalone';

import { TabsService } from './tabs.service';

@Component({
  selector: 'kirby-tab-bar',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements AfterViewInit, OnDestroy {
  @HostBinding('class.tab-bar-bottom-hidden')
  tabBarBottomHidden = false;
  @ViewChild(IonTabs, { static: true }) tabs: IonTabs;

  constructor(private tabsService: TabsService) {}

  ngAfterViewInit() {
    this.tabsService.setOutlet(this.tabs.outlet);
  }

  ngOnDestroy() {
    this.tabsService.resetOutlet();
  }
}
