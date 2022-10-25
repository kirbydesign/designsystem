import {
  ApiDescriptionProperty,
  ApiDescriptionPropertyColumns,
} from '~/app/shared/api-description/api-description-properties/api-description-properties.component';

export const dataTableApi: ApiDescriptionProperty[] = [
  {
    name: '[fixedLayout]',
    description: `(Optional) [kirby-table] Is layout of table fixed.`,
    type: ['boolean'],
    defaultValue: 'false',
  },
  {
    name: '[selectable]',
    description: `(Optional) [kirby-tr] Is row selectable.`,
    type: ['boolean'],
    defaultValue: 'false',
  },
];
