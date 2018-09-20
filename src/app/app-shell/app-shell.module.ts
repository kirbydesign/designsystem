import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ROUTES } from './app-shell.common';
import { COMPONENT_DECLARATIONS } from './app-shell.common';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [COMPONENT_DECLARATIONS]
})
export class AppShellModule { }
