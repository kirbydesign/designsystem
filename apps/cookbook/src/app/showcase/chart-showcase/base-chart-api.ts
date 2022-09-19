import {
  ApiDescriptionProperty,
  ApiDescriptionPropertyColumns,
} from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

/* 
  This part of the API is stored in this file as it is shared between 
  the ChartComponent & StockChartComponent
*/
export const baseChartApi: ApiDescriptionProperty[] = [
  {
    name: 'labels',
    description: `(Optional) Labels that should be displayed along the main axis for each category. \n\n Multi-line labels can be created by supplying a string[][] as such: ['one line', ['multi', 'line']].`,
    type: ['string[]', 'string[][]'],
  },
  {
    name: 'height',
    description: `(Optional) can be used to set the height of the chart. Will overwrite the value of setting the height using --kirby-chart-height.`,
    type: ['string', 'number'],
    defaultValue: '300px',
  },
  {
    name: 'customOptions',
    description: `(Optional) Chart.js options that can be used to customize the charts. \n\n See: https://www.chartjs.org/docs/latest/general/options.html`,
    type: ['ChartOptions'],
  },
  {
    name: 'annotations',
    description: `(Optional) Chart.js annotations that can be used to add annotations to the chart. \n\n See: https://www.chartjs.org/chartjs-plugin-annotation/`,
    type: ['AnnotationOptions[]'],
  },
  {
    name: 'highlightedElements',
    description: `(Optional) can be used to highlight specific data elements in the chart. \n\n Provided as an array of [number, number] tuples where the first value is the datasetIndex and the second is the dataIndex.`,
    type: ['[number, number][]'],
  },
];

export const baseChartCssCustomProperties: {
  columns: ApiDescriptionPropertyColumns;
  apiDescription: ApiDescriptionProperty[];
} = {
  columns: {
    name: 'Name',
    description: 'Description',
  },
  apiDescription: [
    {
      name: '--kirby-chart-height',
      description: 'Height of the chart.',
    },
  ],
};
