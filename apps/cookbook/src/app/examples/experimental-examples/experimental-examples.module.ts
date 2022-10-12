import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KirbyExperimentalModule, KirbyModule } from '@kirbydesign/designsystem';
import { PageLocalNavigationExampleComponent } from './components';
import { ExamplesSharedModule } from '~/app/examples/examples.shared.module';

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
    ExamplesSharedModule,
  ],
  exports: COMPONENT_DECLARATIONS,
  declarations: COMPONENT_DECLARATIONS,
})
export class ExperimentalExamplesModule {}
