import {ExamplesModule} from '../examples/examples.module';
import {ShowcaseRoutingModule} from './showcase-routing.module';
import {ShowcaseComponent} from './showcase.component';
import {ButtonShowcaseComponent} from './button-showcase/button-showcase.component';
import {CardShowcaseComponent} from './card-showcase/card-showcase.component';
import {ListShowcaseComponent} from './list-showcase/list-showcase.component';
import { ChartShowcaseComponent } from './chart-showcase/chart-showcase.component';

export const COMPONENT_IMPORTS: any[] = [
    ExamplesModule,
    ShowcaseRoutingModule
];

export const COMPONENT_EXPORTS: any[] = [
    CardShowcaseComponent,
    ButtonShowcaseComponent,
    ListShowcaseComponent,
    ChartShowcaseComponent
];

export const COMPONENT_DECLARATIONS: any[] = [
  ...COMPONENT_EXPORTS,
  ShowcaseComponent
];
