import { argsToTemplate, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { CardModule } from '@kirbydesign/designsystem/card';
import { SlideModule, SlidesComponent } from '@kirbydesign/designsystem/slide';
import { responsiveModes } from 'tools/storybook-config/shared-config';

import { SlidesExampleComponent } from '~/app/examples/slides-example/slides-example.component';

const meta: Meta<SlidesComponent> = {
  component: SlidesComponent,
  title: 'Components / Slides',
  decorators: [
    moduleMetadata({
      imports: [SlideModule, CardModule, SlidesExampleComponent],
    }),
  ],
  parameters: {
    chromatic: {
      modes: {
        ...responsiveModes,
      },
    },
  },
};
export default meta;
type Story = StoryObj<SlidesComponent>;

export const Slides: Story = {
  args: {
    title: 'Title',
    showNavigation: true,
    slides: [...Array(9).keys()].map((number) => ({
      title: `Slide ${number + 1}`,
      subtitle: `Subtitle ${number + 1}`,
      cardContent: `Lorem ipsum dolor sit amet consectetur adipisicing elit.`,
    })),
  },
  render: (args) => ({
    props: args,
    template: `<kirby-slides ${argsToTemplate(args)}>
    <kirby-card *kirbySlide="let slide; let i = index" [hasPadding]="true">
      <kirby-card-header [title]="slide.title" [subtitle]="slide.subtitle"></kirby-card-header>
      <div>{{ slide.cardContent }}</div>
    </kirby-card>
  </kirby-slides>`,
  }),
};

export const CookbookExamples: Story = {
  render: () => ({
    template: `<cookbook-slides-example></cookbook-slides-example>`,
  }),
};
