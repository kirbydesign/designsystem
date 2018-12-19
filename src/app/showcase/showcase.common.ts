import { ExamplesModule } from '../examples/examples.module';
import { AvatarShowcaseComponent } from './avatar-showcase/avatar-showcase.component';
import { ButtonShowcaseComponent } from './button-showcase/button-showcase.component';
import { CardShowcaseComponent } from './card-showcase/card-showcase.component';
import { FontsShowcaseComponent } from './fonts-showcase/fonts-showcase.component';
import { GridShowcaseComponent } from './grid-showcase/grid-showcase.component';
import { ListShowcaseComponent } from './list-showcase/list-showcase.component';
import { ShowcaseComponent } from './showcase.component';
import { ShowcaseRoutingModule } from './showcase-routing.module';
import { ColorsShowcaseComponent } from './colors-showcase/colors-showcase.component';

export const COMPONENT_IMPORTS: any[] = [
    ExamplesModule,
    ShowcaseRoutingModule
];

export const COMPONENT_EXPORTS: any[] = [
    CardShowcaseComponent,
    ColorsShowcaseComponent,
    ButtonShowcaseComponent,
    ListShowcaseComponent,
    GridShowcaseComponent,
    AvatarShowcaseComponent,
    FontsShowcaseComponent
];

export const COMPONENT_DECLARATIONS: any[] = [
  ...COMPONENT_EXPORTS,
  ShowcaseComponent
];
