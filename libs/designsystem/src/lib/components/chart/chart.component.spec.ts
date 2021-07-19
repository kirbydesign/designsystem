import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockProvider } from 'ng-mocks';

import { ChartJSService } from './chart-js/chart-js.service';
import { ChartComponent } from './chart.component';

describe('ChartComponent', () => {
  let spectator: Spectator<ChartComponent>;
  let component: ChartComponent;
  const createComponent = createComponentFactory({
    component: ChartComponent,
    declarations: [ChartComponent],
    componentProviders: [MockProvider(ChartJSService)],
  });

  beforeEach(() => {
    spectator = createComponent({});
    component = spectator.component;
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should have correct default height', () => {
    expect(spectator.query('.chart-container')).toHaveComputedStyle({
      height: '300px',
    });
  });

  describe('when "type" is not provided', () => {
    it('should default to correct type', () => {
      expect(component.type).toBe('column');
    });
  });

  it('should render chart once after view init', () => {
    const renderChartSpy = spyOn<any>(component, 'renderChart');

    component.ngAfterViewInit();

    expect(renderChartSpy).toHaveBeenCalledTimes(1);
  });

  it("should be possible to set the height with the '--kirby-chart-height' CSS custom property", () => {
    const customHeight = '600px';
    const element = spectator.query('.chart-container') as HTMLElement;
    expect(element).not.toHaveComputedStyle({ height: customHeight });

    element.style.setProperty('--kirby-chart-height', customHeight);

    expect(element).toHaveComputedStyle({ height: customHeight });
  });

  describe("when setting height through the 'height' input property", () => {
    it('should be possible to use a number', () => {
      const customHeight = 600;
      const element = spectator.query('.chart-container') as HTMLElement;
      expect(element).not.toHaveComputedStyle({ height: `${customHeight}px` });

      spectator.setInput('height', customHeight);
      spectator.detectChanges();

      expect(element).toHaveComputedStyle({ height: `${customHeight}px` });
    });

    it('should be possible to use a string', () => {
      const customHeight = '600px';
      const element = spectator.query('.chart-container') as HTMLElement;
      expect(element).not.toHaveComputedStyle({ height: customHeight });

      spectator.setInput('height', customHeight);
      spectator.detectChanges();

      expect(element).toHaveComputedStyle({ height: customHeight });
    });
  });

  describe('when changes occur to', () => {
    const scenarios = {
      customOptions: {
        updateFn: 'updateCustomOptions',
        newValue: { onClick: () => console.log('testing') },
      },
      data: { updateFn: 'updateData', newValue: [1, 2, 3] },
      dataLabels: { updateFn: 'updateDataLabels', newValue: ['one', 'two', 'three'] },
      type: { updateFn: 'updateType', newValue: 'bar' },
      annotations: { updateFn: 'updateAnnotations', newValue: [{ type: 'line' }] },
    };

    Object.entries(scenarios).forEach(([property, { updateFn, newValue }]) => {
      describe(`${property}`, () => {
        it(`should only update ${property}`, () => {
          const updateFnSpy = spyOn<any>(component, updateFn);

          spectator.setInput(property as any, newValue);

          expect(updateFnSpy).toHaveBeenCalledTimes(1);
        });

        it('should redraw once', () => {
          const redrawChartSpy = spyOn<any>(component, 'redrawChart');

          spectator.setInput(property as any, newValue);

          expect(redrawChartSpy).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe('multiple chartJS related input properties at the same time', () => {
      it('should update all of the properties once', () => {
        const updateFnSpies = [
          spyOn<any>(component, 'updateData'),
          spyOn<any>(component, 'updateDataLabels'),
          spyOn<any>(component, 'updateType'),
          spyOn<any>(component, 'updateCustomOptions'),
        ];

        spectator.setInput({
          data: [1, 2, 3],
          dataLabels: ['one', 'two', 'three'],
          type: 'bar',
          customOptions: { onClick: () => console.log('testing') },
        });

        updateFnSpies.forEach((updateFnSpy) => {
          expect(updateFnSpy).toHaveBeenCalledTimes(1);
        });
      });

      it('should redraw chart once', () => {
        const redrawChartSpy = spyOn<any>(component, 'redrawChart');

        spectator.setInput({
          data: [1, 2, 3],
          dataLabels: ['one', 'two', 'three'],
          type: 'bar',
          customOptions: { onClick: () => console.log('testing') },
        });

        expect(redrawChartSpy).toHaveBeenCalledTimes(1);
      });
    });
  });
});
