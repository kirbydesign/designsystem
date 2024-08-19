import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KirbyExperimentalModule, KirbyModule } from '@kirbydesign/designsystem';
import { ExampleConfigurationWrapperComponent } from '../example-configuration-wrapper/example-configuration-wrapper.component';
import { PageLocalNavigationExampleComponent } from './components';

const COMPONENT_DECLARATIONS = [PageLocalNavigationExampleComponent];

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'local-navigation',
        component: PageLocalNavigationExampleComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    KirbyModule,
    KirbyExperimentalModule,
    ExampleConfigurationWrapperComponent,
  ],
  exports: COMPONENT_DECLARATIONS,
  declarations: COMPONENT_DECLARATIONS,
})
export class ExperimentalExamplesModule {}
