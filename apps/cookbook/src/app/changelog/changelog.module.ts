import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { KirbyModule } from '@kirbydesign/designsystem';
import { ChangelogComponent } from './changelog.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ChangelogComponent,
      },
    ]),
    IonicModule.forRoot(),
    KirbyModule,
  ],
  declarations: [ChangelogComponent],
  exports: [ChangelogComponent],
})
export class ChangelogModule {}
