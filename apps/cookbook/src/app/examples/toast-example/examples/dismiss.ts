import { Component } from '@angular/core';
import { ButtonComponent } from '@kirbydesign/designsystem/button';
import { Overlay } from '@kirbydesign/designsystem/modal';
import { ToastController } from '@kirbydesign/designsystem/toast';

const config = {
  selector: 'cookbook-toast-example-dismiss',
  template: `<button kirby-button (click)="showPersistentToast()">Show persistent toast</button>
<button kirby-button attentionLevel="2" (click)="dismissToast()">Dismiss toast</button>`,
};

const codeSnippet = `// Show a persistent toast (durationInMs: 0)
const toast = await this.toastController.showToast({
  message: 'This toast will stay until dismissed',
  messageType: 'warning',
  durationInMs: 0,
});

// Later, dismiss programmatically
await toast.dismiss();`;

@Component({
  selector: config.selector,
  template: config.template,
  styleUrls: ['../../_examples.shared.scss', '../../_modal-playground.shared.scss'],
  imports: [ButtonComponent],
})
export class ToastExampleDismissComponent {
  static readonly template = config.template;
  static readonly codeSnippet = codeSnippet;

  private currentToast: Overlay | null = null;

  constructor(private toastController: ToastController) {}

  async showPersistentToast() {
    // Dismiss any existing toast first
    if (this.currentToast) {
      await this.currentToast.dismiss();
    }

    this.currentToast = await this.toastController.showToast({
      message: 'This toast will stay until dismissed',
      messageType: 'warning',
      durationInMs: 0,
    });

    // Clear reference when toast is dismissed
    this.currentToast.onDidDismiss.then(() => {
      this.currentToast = null;
    });
  }

  async dismissToast() {
    if (this.currentToast) {
      await this.currentToast.dismiss();
      this.currentToast = null;
    }
  }
}
