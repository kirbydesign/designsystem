import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PlatformService } from '@kirbydesign/designsystem/helpers';
import { ListActionMultipleActionsExampleComponent } from './list-action-multiple-actions-example.component';
import { ListActionOneActionExampleComponent } from './list-action-one-action-example.component';

const routes = [
  {
    path: 'single-action',
    component: ListActionOneActionExampleComponent,
  },
  {
    path: 'multiple-actions',
    component: ListActionMultipleActionsExampleComponent,
  },
];

@NgModule({
  imports: [
    ListActionOneActionExampleComponent,
    ListActionMultipleActionsExampleComponent,
    RouterModule.forChild(routes),
  ],
  declarations: [],
  providers: [
    {
      provide: PlatformService,
      useValue: {
        isTouch: () => true,
      },
    },
  ],
})
export class ListActionMobileWrapperModule {}
