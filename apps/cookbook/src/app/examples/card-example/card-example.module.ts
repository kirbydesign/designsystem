import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { KirbyModule } from '@kirbydesign/designsystem';

import { CardExampleComponent } from './card-example.component';
import { CardBackgroundImageExampleComponent } from './examples/card-background-image-example/card-background-image-example.component';
import { CardClickableExampleComponent } from './examples/card-clickable-example/card-clickable-example.component';
import { CardCssBackgroundImageExampleComponent } from './examples/card-css-background-image-example/card-css-background-image-example.component';
import { CardElevationsExampleComponent } from './examples/card-elevations-example/card-elevations-example.component';
import { CardThemecolorExampleComponent } from './examples/card-themecolor-example/card-themecolor-example.component';
import { CardWithItemHeaderExampleComponent } from './examples/card-with-item-header-example/card-with-item-header-example.component';

const COMPONENT_DECLARATIONS = [
  CardExampleComponent,
  CardClickableExampleComponent,
  CardElevationsExampleComponent,
  CardThemecolorExampleComponent,
  CardBackgroundImageExampleComponent,
  CardCssBackgroundImageExampleComponent,
  CardWithItemHeaderExampleComponent,
];

@NgModule({
  declarations: COMPONENT_DECLARATIONS,
  imports: [CommonModule, KirbyModule],
  exports: COMPONENT_DECLARATIONS,
})
export class CardExampleModule {}
