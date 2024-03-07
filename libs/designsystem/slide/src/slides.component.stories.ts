import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { CardModule } from '@kirbydesign/designsystem/card';
import { SlidesComponent } from './slides.component';
import { SlideModule } from './slide.module';

const meta: Meta<SlidesComponent> = {
  component: SlidesComponent,
  title: 'SlidesComponent',
  decorators: [
    moduleMetadata({
      imports: [SlideModule, CardModule],
    }),
  ],
};
export default meta;
type Story = StoryObj<SlidesComponent>;

export const Default: Story = {
  args: {
    title: 'Title',
    showNavigation: true,
    slides: [...Array(9).keys()].map((number) => ({
      title: `Slide ${number + 1}`,
      subtitle: `Subtitle ${number + 1}`,
      cardContent: `Lorem ipsum dolor sit amet consectetur adipisicing elit.`,
    })),
  },
  render: (args: SlidesComponent) => ({
    props: args,
    template: `<kirby-slides ${argsToTemplate(args)}>
    <kirby-card *kirbySlide="let slide; let i = index" [hasPadding]="true">
      <kirby-card-header [title]="slide.title" [subtitle]="slide.subtitle"></kirby-card-header>
      <div>{{ slide.cardContent }}</div>
    </kirby-card>
  </kirby-slides>`,
  }),
};
