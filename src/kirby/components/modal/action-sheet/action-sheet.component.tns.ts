import { Component } from '@angular/core';
import { ContentView, ShownModallyData, View } from 'tns-core-modules/ui/content-view';
import { ModalDialogParams } from 'nativescript-angular';

@Component({
  templateUrl: './action-sheet.component.html',
  styleUrls: ['./action-sheet.component.scss'],
})
export class ActionSheetComponent extends ContentView {
  view: View;

  constructor(private params: ModalDialogParams) {
    super();
    const context = this.params.context;
    console.log(`context: ${context}`);
  }

  onShowingActionSheet(args: ShownModallyData): void {
    this.view = <View>args.object;
    this.animateModal();
  }

  // this function is currently the same as the modal.component.tns.ts one
  // either extract it in a common place, or change the function
  private animateModal(): void {
    if (this.view.android) {
      this.view
        .animate({
          translate: { x: 0, y: Number(this.view.height) },
          duration: 0,
        })
        .then(() => {
          this.view.animate({
            translate: { x: 0, y: 0 },
            duration: 300,
          });
        });
    }
  }
}
