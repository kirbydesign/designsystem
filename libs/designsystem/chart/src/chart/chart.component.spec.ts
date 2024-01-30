import { fakeAsync, tick } from '@angular/core/testing';
import { createHostFactory, Spectator } from '@ngneat/spectator';
import { MockProvider } from 'ng-mocks';

import { ChartJSService } from '../shared';

import { ChartComponent } from './chart.component';

describe('ChartComponent', () => {
  let spectator: Spectator<ChartComponent>;
  let component: ChartComponent;
  const createHost = createHostFactory({
    component: ChartComponent,
    declarations: [ChartComponent],
    componentProviders: [MockProvider(ChartJSService)],
  });

  beforeEach(() => {
    spectator = createHost('<kirby-chart></kirby-chart>');
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

  describe(`when wrapper element doesn't have height & width`, () => {
    let updateFnSpy;

    beforeEach(() => {
      updateFnSpy = spyOn<any>(component, 'updateLabels');
      spectator.setInput('labels', ['1', '2']);
    });

    it('should not call the corresponding update function', () => {
      expect(updateFnSpy).toHaveBeenCalledTimes(0);
    });
  });

  describe('when "type" is not provided', () => {
    it('should default to correct type', () => {
      expect(component.type).toBe('column');
    });
  });

  it('should render chart once after view init', fakeAsync(() => {
    const renderChartSpy = spyOn<any>(component, 'renderChart');

    component.ngAfterViewInit();
    tick();

    expect(renderChartSpy).toHaveBeenCalledTimes(1);
  }));

  it("should be possible to set the height with the '--kirby-chart-height' CSS custom property", () => {
    const customHeight = '600px';
    const chartContainerElement = spectator.query('.chart-container') as HTMLElement;
    expect(chartContainerElement).not.toHaveComputedStyle({ height: customHeight });

    spectator.element.style.setProperty('--kirby-chart-height', customHeight);

    expect(chartContainerElement).toHaveComputedStyle({ height: customHeight });
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
      labels: { updateFn: 'updateLabels', newValue: ['one', 'two', 'three'] },
      type: { updateFn: 'updateType', newValue: 'bar' },
      annotations: { updateFn: 'updateAnnotations', newValue: [{ type: 'line' }] },
      highlightedElements: { updateFn: 'updateHighlightedElements', newValue: [[0, 1]] },
    };

    Object.entries(scenarios).forEach(([property, { updateFn, newValue }]) => {
      describe(`${property}`, () => {
        beforeEach(fakeAsync(() => {
          spectator.component['ngAfterViewInit']();
          tick();
        }));

        it(`should update ${property}`, () => {
          const updateFnSpy = spyOn<any>(component, updateFn);

          spectator.setInput(property as any, newValue);

          expect(spectator.component['chartHasBeenRendered']).toBeTrue();
          expect(updateFnSpy).toHaveBeenCalledTimes(1);
        });

        it(`should not update properties that are not ${property}`, () => {
          const updateFnSpies = Object.entries(scenarios)
            .filter(([key]) => key !== property)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .map(([_, { updateFn }]) => spyOn<any>(component, updateFn));
          expect(updateFnSpies.length).not.toBe(0);

          spectator.setInput(property as any, newValue);

          updateFnSpies.forEach((updateFnSpy) => expect(updateFnSpy).toHaveBeenCalledTimes(0));
        });

        it('should redraw once', () => {
          const redrawChartSpy = spyOn<any>(component, 'redrawChart');

          spectator.setInput(property as any, newValue);

          expect(redrawChartSpy).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe('multiple chartJS related input properties at the same time', () => {
      beforeEach(fakeAsync(() => {
        spectator.component['ngAfterViewInit']();
        tick();
      }));

      it('should update all of the properties once', () => {
        const updateFnSpies = [
          spyOn<any>(component, 'updateData'),
          spyOn<any>(component, 'updateLabels'),
          spyOn<any>(component, 'updateType'),
          spyOn<any>(component, 'updateCustomOptions'),
          spyOn<any>(component, 'updateAnnotations'),
          spyOn<any>(component, 'updateHighlightedElements'),
        ];

        spectator.setInput({
          data: [1, 2, 3],
          labels: ['one', 'two', 'three'],
          type: 'bar',
          customOptions: { onClick: () => console.log('testing') },
          annotations: [{ type: 'line' }],
          highlightedElements: [[0, 1]],
        });

        updateFnSpies.forEach((updateFnSpy) => {
          expect(updateFnSpy).toHaveBeenCalledTimes(1);
        });
      });

      it('should redraw chart once', () => {
        const redrawChartSpy = spyOn<any>(component, 'redrawChart');

        spectator.setInput({
          data: [1, 2, 3],
          labels: ['one', 'two', 'three'],
          type: 'bar',
          customOptions: { onClick: () => console.log('testing') },
        });

        expect(redrawChartSpy).toHaveBeenCalledTimes(1);
      });
    });
  });
});
