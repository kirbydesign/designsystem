import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';
import { VerticalStepperComponent } from './vertical-stepper.component';
import { VerticalStepperStep } from './vertical-stepper.types';

describe('VerticalStepperComponent', () => {
  let spectator: SpectatorHost<VerticalStepperComponent>;
  const createHost = createHostFactory({
    component: VerticalStepperComponent,
  });

  const steps: VerticalStepperStep[] = [
    { title: 'Horse', description: '' },
    { title: 'Dog', description: 'A cosy animal' },
    { title: 'Mosquito', description: 'An annoying animal' },
    { title: 'Leopard', description: 'A cool animal' },
  ];

  function createComponent(activeIndex: number) {
    spectator = createHost(
      `<kirby-x-vertical-stepper [steps]="steps" [activeIndex]="activeIndex"></kirby-x-vertical-stepper>`,
      { hostProps: { steps, activeIndex } }
    );
  }

  it('should create', () => {
    createComponent(0);
    expect(spectator.component).toBeTruthy();
  });

  it('should render a step for each item, with title and description', () => {
    createComponent(0);
    const titles = spectator.queryAll('.step .title');
    const descriptions = spectator.queryAll('.step .description');

    expect(titles).toHaveLength(4);
    expect(titles[0].textContent?.trim()).toEqual('Horse');
    expect(titles[1].textContent?.trim()).toEqual('Dog');

    // Steps without a description should not render the description element
    expect(descriptions).toHaveLength(3);
    expect(descriptions[0].textContent?.trim()).toEqual('A cosy animal');
  });

  describe('when no steps are completed', () => {
    beforeEach(() => createComponent(0));

    it('should not have any completed steps', () => {
      expect(spectator.query('.step.completed')).toBeNull();
    });

    it('should have the first step active', () => {
      expect(spectator.query('.step.active .title')?.textContent?.trim()).toEqual('Horse');
    });
  });

  describe('when the first step is completed', () => {
    beforeEach(() => createComponent(1));

    it('should mark the first step as completed', () => {
      expect(spectator.query('.step.completed .title')?.textContent?.trim()).toEqual('Horse');
    });

    it('should mark the second step as active', () => {
      expect(spectator.query('.step.active .title')?.textContent?.trim()).toEqual('Dog');
    });
  });

  describe('when the first two steps are completed', () => {
    beforeEach(() => createComponent(2));

    it('should mark the first two steps as completed', () => {
      const completedTitles = spectator.queryAll('.step.completed .title');
      expect(completedTitles).toHaveLength(2);
      expect(completedTitles[0].textContent?.trim()).toEqual('Horse');
      expect(completedTitles[1].textContent?.trim()).toEqual('Dog');
    });

    it('should mark the third step as active', () => {
      expect(spectator.query('.step.active .title')?.textContent?.trim()).toEqual('Mosquito');
    });
  });
});
