import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageLocalNavigationComponent } from './components';
import { KirbyModule } from './kirby.module';

const COMPONENT_DECLARATIONS = [PageLocalNavigationComponent];

/**
 * This module contains experimental components, that should not be used in a production environment.
 * @see KirbyModule
 */
@NgModule({
  imports: [CommonModule, KirbyModule],
  exports: COMPONENT_DECLARATIONS,
  declarations: COMPONENT_DECLARATIONS,
})
export class KirbyExperimentalModule {}
