import {
  argsToTemplate,
  componentWrapperDecorator,
  type Meta,
  moduleMetadata,
  type StoryObj,
} from '@storybook/angular';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { ButtonSize } from '@kirbydesign/designsystem/button';
import { ItemComponent } from '@kirbydesign/designsystem/item';
import { MenuComponent } from '@kirbydesign/designsystem/menu';

const meta: Meta<MenuComponent> = {
  component: MenuComponent,
  title: 'Components / Menu',
  decorators: [
    moduleMetadata({
      imports: [ItemComponent],
    }),
  ],
};
export default meta;
type Story = StoryObj<MenuComponent>;

export const Menu: Story = {
  args: {
    isDisabled: false,
    buttonSize: ButtonSize.MD,
    placement: 'bottom-start',
    attentionLevel: '3',
    triggers: ['click'],
    autoPlacement: false,
    closeOnSelect: true,
    closeOnEscapeKey: true,
    closeOnBackdrop: true,
    shift: true,
    minWidth: 0,
  },
  render: (args) => ({
    props: args,
    template: `<kirby-menu ${argsToTemplate(args)}>
    <kirby-item>
      <p>Action 1</p>
    </kirby-item>
  </kirby-menu>
  `,
  }),
};

const scrollableItems = Array.from(
  { length: 30 },
  (_, index) => `<kirby-item><p>Action ${index + 1}</p></kirby-item>`
).join('');

export const MenuOpenedWithScrollableList: Story = {
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      modes: {
        'small-height': { viewport: { width: 375, height: 320 } },
      },
    },
  },
  args: {
    placement: 'bottom-start',
    shift: true,
  },
  decorators: [
    componentWrapperDecorator(
      (story) =>
        `<div style="position: fixed; inset: 0;"><div style="position: absolute; bottom: var(--kirby-spacing-s); left: var(--kirby-spacing-s);">${story}</div></div>`
    ),
  ],
  render: (args) => ({
    props: args,
    template: `<kirby-menu ${argsToTemplate(args)}>${scrollableItems}</kirby-menu>`,
  }),
  play: async ({ canvasElement }) => {
    const menuButton = within(canvasElement).getByRole('button', { name: 'More' });
    await userEvent.click(menuButton);
    await waitFor(() => expect(menuButton).toHaveAttribute('aria-expanded', 'true'));

    const menu = await within(canvasElement.ownerDocument.body).findByRole('menu');
    await waitFor(() =>
      expect(menu.style.getPropertyValue('--kirby-floating-available-height')).not.toBe('')
    );

    const viewport = canvasElement.ownerDocument.defaultView;
    const viewportGap = parseFloat(
      viewport
        .getComputedStyle(viewport.document.documentElement)
        .getPropertyValue('--kirby-spacing-s')
    );
    const menuBounds = menu.getBoundingClientRect();
    const triggerBounds = menuButton.getBoundingClientRect();

    expect(menuBounds.bottom).toBeLessThanOrEqual(triggerBounds.top);
    expect(menuBounds.top).toBeGreaterThanOrEqual(viewportGap);
    expect(menuBounds.bottom).toBeLessThanOrEqual(viewport.innerHeight - viewportGap);
    expect(menu.scrollHeight).toBeGreaterThan(menu.clientHeight);
  },
};
