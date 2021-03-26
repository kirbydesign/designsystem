import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { ChartDataSets } from 'chart.js';

import { Chart2Component } from './chart.component';
import { ChartDataType } from './chartOptions';

describe('Chart 2 Component', () => {
  let component: Chart2Component;
  let spectator: SpectatorHost<Chart2Component>;
  let element: HTMLElement;

  const createHost = createHostFactory({
    component: Chart2Component,
    providers: [],
  });

  describe('should create', () => {
    beforeEach(() => {
      spectator = createHost(`<kirby-chart-2></kirby-chart-2>`);
      component = spectator.component;
    });

    it('component', () => {
      expect(component).toBeTruthy();
      expect(spectator.component).toBeTruthy();
    });

    it('component with default properties', () => {
      expect(spectator.element).toHaveComputedStyle({ height: '300px' });
      expect(component.type).toBe('line');
      expect(component.height).toBe(300);
      expect(component.label).toBeNull();
      expect(component.backgroundColor).toBeNull();
      expect(component.borderColor).toBeNull();
      expect(component.borderWidth).toBeUndefined();
      expect(component.useDefaultOptions).toBe(true);
      expect(component.useDefaultStyle).toBe(true);

      expect(component.labels).toBeNull();
      expect(component.datasets).toEqual([]);
    });
  });

  describe('should by customization', () => {
    beforeEach(() => {
      spectator = createHost(`<kirby-chart-2 
                                                type="bar"
                                                label="Bar"
                                                [height]="250"
                                                >
                                              </kirby-chart-2>`);

      component = spectator.component;
      element = spectator.element;
    });

    it('set correct default chart height using custom properties', () => {
      window.document.documentElement.style.setProperty('--kirby-chart-height', '420px');
      expect(element).toHaveComputedStyle({ height: '420px' });
    });
  });

  describe('and by bar Configuration', () => {
    beforeEach(() => {
      spectator = createHost(`<kirby-chart-2 
                                            type="bar"
                                            label="Bar"
                                             [height]="400"
                                            >
                                          </kirby-chart-2>`);
      component = spectator.component;
    });

    it(' set correct Configuration options', () => {
      expect(component.height).toBe(400);
      expect(component.type).toBe('bar');
      expect(component.label).toBe('Bar');
      expect(component.mergedOptions).toBeTruthy();
      expect(component.mergedOptions.type).toBe('bar');
      expect(component.mergedOptions.options.responsive).toBe(true);
    });
  });

  describe('and by line Configuration', () => {
    beforeEach(() => {
      spectator = createHost(`<kirby-chart-2 
                                            type="line"
                                            label="Line"
                                            >
                                          </kirby-chart-2>`);
      component = spectator.component;
    });

    it('set correct Configuration options', () => {
      expect(component.mergedOptions).toBeTruthy();
      expect(component.type).toBe('line');
      expect(component.label).toBe('Line');
      expect(component.mergedOptions.type).toBe('line');
      expect(component.mergedOptions.options.responsive).toBe(true);
    });
  });

  describe('and by customization of all properties', () => {
    beforeEach(() => {
      spectator = createHost(`<kirby-chart-2 
                                                type="horizontalBar"
                                                label="Horizontal Bar 1"
                                                [height]="242"
                                                [backgroundColor]="['red']"
                                                [borderColor]="['blue']"
                                                [borderWidth]="5"
                                                [useDefaultOptions]="false"
                                                [useDefaultStyle]="false"
                                                [labels]="['red', 'blue' ,'black']"                                                
                                                >
                                              </kirby-chart-2>`);

      component = spectator.component;
      element = spectator.element;
      component.ngOnChanges({ type: {} as any });
    });

    it('properties should all be set', () => {
      expect(component.type).toBe('horizontalBar');
      expect(component.label).toBe('Horizontal Bar 1');
      expect(component.backgroundColor).toEqual(['red']);
      expect(component.borderColor).toEqual(['blue']);
      expect(component.borderWidth).toBe(5);
      expect(component.useDefaultOptions).toBe(false);
      expect(component.useDefaultStyle).toBe(false);
    });
  });

  describe('and by setting dataset', () => {
    const dataset: ChartDataSets = { label: 'somelabel1', data: [1, 2, 3, 4, 5, 6, 7] };

    beforeEach(() => {
      spectator = createHost(`<kirby-chart-2 
                                                type="horizontalBar"
                                                label="Horizontal Bar 1"
                                                [height]="242"
                                                [backgroundColor]="['red']"
                                                [borderColor]="['blue']"
                                                [borderWidth]="5"
                                                [useDefaultOptions]="false"
                                                [useDefaultStyle]="false"
                                                [labels]="['red', 'blue' ,'black']"
                                                [dataset]="dataset"
                                                >
                                              </kirby-chart-2>`);

      component = spectator.component;
      element = spectator.element;
      component.ngOnChanges({ type: {} as any });
    });

    it('datasets should all be set', () => {
      expect(component.type).toBe('horizontalBar');
      expect(component.label).toBe('Horizontal Bar 1');

      console.log('the dataset', dataset);
      console.log('the component', component);
      expect(component.labels).toEqual(['red', 'blue', 'black']);
      expect(component.datasets[0].label).toEqual('somelabe1l');
    });
  });

  describe('and by setting datasets array', () => {
    const datasets: ChartDataSets[] = [{ label: 'somelabel2', data: [1, 2, 3, 4, 5, 6, 7] }];

    beforeEach(() => {
      spectator = createHost(`<kirby-chart-2 
                                                type="horizontalBar"
                                                label="Horizontal Bar 1"
                                                [height]="242"
                                                [backgroundColor]="['red']"
                                                [borderColor]="['blue']"
                                                [borderWidth]="5"
                                                [useDefaultOptions]="false"
                                                [useDefaultStyle]="false"
                                                [labels]="['red', 'blue' ,'black']"
                                                [datasets]="datasets"
                                                >
                                              </kirby-chart-2>`);

      component = spectator.component;
      element = spectator.element;
      component.ngOnChanges({ type: {} as any });
    });

    it('data should be set', () => {
      expect(component.type).toBe('horizontalBar');
      expect(component.label).toBe('Horizontal Bar 1');
      expect(component.datasets).toBeTruthy();
      expect(component.datasets[0].label).toEqual('somelabe12');
    });
  });

  describe('and by setting data', () => {
    const data: ChartDataType = [1, 2, 3, 4, 5, 6, 7];

    beforeEach(() => {
      spectator = createHost(`<kirby-chart-2 
                                                type="horizontalBar"
                                                label="Horizontal Bar 1"
                                                [height]="242"
                                                [backgroundColor]="['red']"
                                                [borderColor]="['blue']"
                                                [borderWidth]="5"
                                                [useDefaultOptions]="false"
                                                [useDefaultStyle]="false"
                                                [labels]="['red', 'blue' ,'black']"
                                                [data]="data"
                                                >
                                              </kirby-chart-2>`);

      component = spectator.component;
      element = spectator.element;
      component.ngOnChanges({ type: {} as any });
    });

    it('data should be set', () => {
      console.log('the data', data);
      console.log('the component', component);
      expect(component.data).toBeTruthy();
    });
  });
});
