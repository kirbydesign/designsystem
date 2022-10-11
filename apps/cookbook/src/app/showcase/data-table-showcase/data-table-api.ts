import {
  ApiDescriptionProperty,
  ApiDescriptionPropertyColumns,
} from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

/* 
    This part of the API is stored in this file as it is shared between 
    the ChartComponent & StockChartComponent
  */
export const dataTableApi: ApiDescriptionProperty[] = [
  {
    name: 'selectable',
    description: `(Optional) Is row selectable.`,
    type: ['boolean'],
    defaultValue: 'false',
  },
];

export const dataTableCssCustomProperties: {
  columns: ApiDescriptionPropertyColumns;
  apiDescription: ApiDescriptionProperty[];
} = {
  columns: {
    name: 'Name',
    description: 'Description',
  },
  apiDescription: [
    {
      name: '--kirby-table-layout-fixed',
      description: 'Sets table layout to fixed instead of auto',
    },
  ],
};
