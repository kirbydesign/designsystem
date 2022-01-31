import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KirbyModule } from '@kirbydesign/designsystem';

import { ExamplesModule } from '../examples/examples.module';
import { IphoneModule } from '../iphone/iphone.module';
import { CodeViewerModule } from '../shared/code-viewer/code-viewer.module';

import { GridLayoutExtendedComponent } from './grid-layout/grid-layout-extended/grid-layout-extended.component';
import { GridLayoutMultipleContainersComponent } from './grid-layout/grid-layout-multiple-containers/grid-layout-multiple-containers.component';
import { GridLayoutSingleContainerComponent } from './grid-layout/grid-layout-single-container/grid-layout-single-container.component';
import { GuidesComponent } from './guides.component';
import { VirtualScrollListComponent } from './virtual-scroll/virtual-scroll-list/virtual-scroll-list.component';

const guidesComponents = [
  GuidesComponent,
  GridLayoutSingleContainerComponent,
  GridLayoutMultipleContainersComponent,
  GridLayoutExtendedComponent,
  VirtualScrollListComponent,
];

const routes = [
  {
    path: '',
    component: GuidesComponent,
  },
  {
    path: 'virtual-scroll-list',
    component: VirtualScrollListComponent,
  },
  {
    path: 'grid-layout-single-container',
    component: GridLayoutSingleContainerComponent,
  },
  {
    path: 'grid-layout-multiple-containers',
    component: GridLayoutMultipleContainersComponent,
  },
  {
    path: 'grid-layout-extended',
    component: GridLayoutExtendedComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    KirbyModule,
    IphoneModule,
    CodeViewerModule,
    ExamplesModule,
  ],
  declarations: [...guidesComponents],
  exports: [...guidesComponents],
})
export class GuideModule {}
