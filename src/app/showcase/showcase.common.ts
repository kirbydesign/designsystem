import { ExamplesModule } from '../examples/examples.module';
import { AvatarShowcaseComponent } from './avatar-showcase/avatar-showcase.component';
import { ButtonShowcaseComponent } from './button-showcase/button-showcase.component';
import { CardShowcaseComponent } from './card-showcase/card-showcase.component';
import { FontsShowcaseComponent } from './fonts-showcase/fonts-showcase.component';
import { GridShowcaseComponent } from './grid-showcase/grid-showcase.component';
import { ListShowcaseComponent } from './list-showcase/list-showcase.component';
import { ListLoadOnDemandShowcaseComponent } from './list-load-on-demand-showcase/list-load-on-demand-showcase.component';
import { ShowcaseComponent } from './showcase.component';
import { ChartShowcaseComponent } from './chart-showcase/chart-showcase.component';
import { DoughnutChartShowcaseComponent } from './doughnut-chart-showcase/doughnut-chart-showcase.component';
import { ShowcaseRoutingModule } from './showcase-routing.module';
import { ColorsShowcaseComponent } from './colors-showcase/colors-showcase.component';
import { LineChartShowcaseComponent } from './line-chart-showcase/line-chart-showcase.component';
import { SpinnerShowcaseComponent } from './spinner-showcase/spinner-showcase.component';

export const COMPONENT_IMPORTS: any[] = [ExamplesModule, ShowcaseRoutingModule];

export const COMPONENT_EXPORTS: any[] = [
  CardShowcaseComponent,
  ColorsShowcaseComponent,
  ButtonShowcaseComponent,
  ListShowcaseComponent,
  ListLoadOnDemandShowcaseComponent,
  GridShowcaseComponent,
  AvatarShowcaseComponent,
  ChartShowcaseComponent,
  DoughnutChartShowcaseComponent,
  FontsShowcaseComponent,
  LineChartShowcaseComponent,
  SpinnerShowcaseComponent,
];

export const COMPONENT_DECLARATIONS: any[] = [...COMPONENT_EXPORTS, ShowcaseComponent];
