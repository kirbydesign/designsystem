import { GroupByPipe } from './components/list/pipes/group-by.pipe';
import { AvatarComponent } from './components/avatar/avatar.component';
import { ButtonComponent } from './components/button/button.component';
import { CardFooterComponent } from './components/card/card-footer/card-footer.component';
import { CardHeaderComponent } from './components/card/card-header/card-header.component';
import { CardComponent } from './components/card/card.component';
import { GridComponent } from './components/grid/grid.component';
import { IconComponent } from './components/icon/icon.component';
import { ListComponent } from './components/list/list.component';
import {
  ListItemDirective,
  ListHeaderDirective,
  ListSectionHeaderDirective,
  ListCellDirective,
} from './components/list/list.directive';
import { ComponentLoaderDirective } from './components/shared/component-loader.directive';
import { ChartComponent } from './components/chart/chart.component';
import { ListItemComponent } from './components/list/list-item/list-item.component';
import { ListSectionHeaderComponent } from './components/list/list-section-header/list-section-header.component';
import { ListHeaderComponent } from './components/list/list-header/list-header.component';
import { ListCellComponent } from './components/list/list-cell/list-cell.component';
import { ListCellLineComponent } from './components/list/list-cell-line/list-cell-line.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

export const declarations = [
  CardComponent,
  CardHeaderComponent,
  CardFooterComponent,
  ButtonComponent,
  ListComponent,
  ListItemDirective,
  ListItemComponent,
  ListCellComponent,
  ListCellDirective,
  ListCellLineComponent,
  ListSectionHeaderComponent,
  ListSectionHeaderDirective,
  ListHeaderDirective,
  ListHeaderComponent,
  IconComponent,
  ChartComponent,
  GridComponent,
  ComponentLoaderDirective,
  AvatarComponent,
  GroupByPipe,
  SpinnerComponent,
];
