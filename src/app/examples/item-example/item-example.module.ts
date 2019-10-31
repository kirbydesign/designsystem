import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KirbyModule } from '@kirbydesign/designsystem';
import { ItemDefaultExampleComponent } from './examples/default';
import { ItemTwoColumnsSingleLineComponent } from './examples/two-columns-single-line';
import { ItemTwoColumnsTwoRowsComponent } from './examples/two-colums-two-rows';
import { ItemTwoColumnsSingleLineWithToggleComponent } from './examples/two-columns-single-line-with-toggle';
import { ItemTwoColumnsWithButtonComponent } from './examples/two-columns-with-button';
import { ItemTwoColumnsWithAvatarComponent } from './examples/two-columns-with-avatar';
import { ItemThreeColumnsWithAvatarComponent } from './examples/three-columns-with-avatar';
import { ItemThreeColumnsWithAvatarAndSubTitleComponent } from './examples/tree-columns-with-avatar-and-subtitle';
import { ItemTwoColumnsWithAvatarSubtitleAndDetailsComponent } from './examples/two-columns-with-avatar-subtitle-and-details';
import { ItemThreeColumnsWithSubtitleAndDetailsComponent } from './examples/three-column-with-avatar-subtitle-and-details';
import { ItemThreeColumnsWithAvatarAndButtonComponent } from './examples/three-columns-with-avatar-and-button';
import { ItemThreeColumnsCheckedComponent } from './examples/three-columns-selected';
import { ItemThreeColumnsWithAvatarAndCheckmarkComponent } from './examples/three-columns-with-avatar-and-checkmark';
import { ItemThreeColumnsWithNoteComponent } from './examples/three-columns-with-note';

const COMPONENT_DECLARATIONS = [
  ItemDefaultExampleComponent,
  ItemTwoColumnsSingleLineComponent,
  ItemTwoColumnsTwoRowsComponent,
  ItemTwoColumnsSingleLineWithToggleComponent,
  ItemTwoColumnsWithButtonComponent,
  ItemTwoColumnsWithAvatarComponent,
  ItemThreeColumnsWithAvatarComponent,
  ItemThreeColumnsWithAvatarAndSubTitleComponent,
  ItemTwoColumnsWithAvatarSubtitleAndDetailsComponent,
  ItemThreeColumnsWithSubtitleAndDetailsComponent,
  ItemThreeColumnsWithAvatarAndButtonComponent,
  ItemThreeColumnsCheckedComponent,
  ItemThreeColumnsWithAvatarAndCheckmarkComponent,
  ItemThreeColumnsWithNoteComponent,
];

@NgModule({
  imports: [CommonModule, KirbyModule],
  declarations: COMPONENT_DECLARATIONS,
  exports: COMPONENT_DECLARATIONS,
})
export class ItemExampleModule {}
