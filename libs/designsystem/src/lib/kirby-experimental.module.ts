import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule, PageLocalNavigationComponent } from './components';

const COMPONENT_DECLARATIONS = [PageLocalNavigationComponent];

/**
 * This module contains experimental components, that should not be used in a production environment.
 * *Note some experimental components may use standard components which will require KirbyModule to be imported locally as well
 * @see KirbyModule
 */
@NgModule({
  imports: [CommonModule, IconModule],
  exports: COMPONENT_DECLARATIONS,
  declarations: COMPONENT_DECLARATIONS,
  providers: [],
})
export class KirbyExperimentalModule {}
