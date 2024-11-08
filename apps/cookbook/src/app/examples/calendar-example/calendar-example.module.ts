import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { CalendarComponent } from '@kirbydesign/designsystem/calendar';
import { CardModule } from '@kirbydesign/designsystem/card';

import { CalendarCardExampleComponent } from './examples/in-card';
import { CalendarExampleComponent } from './calendar-example.component';
import { CalendarNoBackgroundExampleComponent } from './examples/no-background';
import { CalendarYearNavigatorExampleComponent } from './examples/year-navigator';

const COMPONENT_DECLARATIONS = [
  CalendarExampleComponent,
  CalendarCardExampleComponent,
  CalendarNoBackgroundExampleComponent,
  CalendarYearNavigatorExampleComponent,
];

@NgModule({
  declarations: COMPONENT_DECLARATIONS,
  imports: [CommonModule, CalendarComponent, CardModule, ButtonComponent],
  exports: COMPONENT_DECLARATIONS,
})
export class CalendarExampleModule {}
