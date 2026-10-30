import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { Overlay } from '@kirbydesign/designsystem/modal';
import { MessageType, ToastController } from '@kirbydesign/designsystem/toast';

// Opens a toast through the ToastController, and keeps it open until the story is left
@Component({
  selector: 'kirby-toast-story',
  template: '',
})
class ToastStoryComponent implements OnInit, OnDestroy {
  @Input() messageType: MessageType = 'success';

  private toastController = inject(ToastController);
  private toast?: Promise<Overlay>;

  ngOnInit() {
    this.toast = this.toastController.showToast({
      message: `Your ${this.messageType} toast message`,
      messageType: this.messageType,
      durationInMs: 0,
      animated: false,
    });
  }

  async ngOnDestroy() {
    (await this.toast)?.dismiss();
  }
}

const meta: Meta<ToastStoryComponent> = {
  component: ToastStoryComponent,
  title: 'Components / Toast',
  decorators: [
    moduleMetadata({
      imports: [ToastStoryComponent],
    }),
  ],
};
export default meta;
type Story = StoryObj<ToastStoryComponent>;

export const Success: Story = {
  args: {
    messageType: 'success',
  },
};

export const Warning: Story = {
  args: {
    messageType: 'warning',
  },
};
