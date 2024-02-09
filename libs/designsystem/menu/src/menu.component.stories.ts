import type { Meta, StoryObj } from '@storybook/angular';

import { ButtonSize } from '@kirbydesign/designsystem/button';
import { MenuComponent } from './menu.component';

const meta: Meta<MenuComponent> = {
  component: MenuComponent,
  title: 'MenuComponent',
};
export default meta;
type Story = StoryObj<MenuComponent>;

export const Primary: Story = {
  args: {
    isDisabled: false,
    buttonSize: ButtonSize.MD,
    placement: 'bottom-start',
    attentionLevel: '3',
    triggers: ['click'],
    // DOMPortalOutlet: this.elementRef.nativeElement.ownerDocument.body,
    autoPlacement: false,
    closeOnSelect: true,
    closeOnEscapeKey: true,
    closeOnBackdrop: true,
    shift: true,
    minWidth: 0,
  },
};
