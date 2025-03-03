import { ChartConfigGuideComponent } from './chart-config-guide/chart-config-guide.component';
import { GridLayoutExtendedComponent } from './grid-layout/grid-layout-extended/grid-layout-extended.component';
import { GridLayoutMultipleContainersComponent } from './grid-layout/grid-layout-multiple-containers/grid-layout-multiple-containers.component';
import { GridLayoutSingleContainerComponent } from './grid-layout/grid-layout-single-container/grid-layout-single-container.component';
import { GuidesComponent } from './guides.component';
import { VirtualScrollListComponent } from './virtual-scroll/virtual-scroll-list/virtual-scroll-list.component';

export const GUIDES_ROUTES = [
  {
    path: '',
    component: GuidesComponent,
  },
  {
    path: 'chart-config',
    component: ChartConfigGuideComponent,
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
