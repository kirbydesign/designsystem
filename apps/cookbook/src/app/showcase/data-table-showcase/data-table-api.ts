import { ApiDescriptionProperty } from '../../shared/api-description/api-description-properties/api-description-properties.component';

export const dataTableApi: ApiDescriptionProperty[] = [
  {
    name: '[sortable]',
    description: `Renders sorting UI on the th element`,
    type: ['boolean'],
    defaultValue: 'false',
  },
  {
    name: '[sortDirection]',
    description: `Controls whether to show the up arrow (ascending) or down arrow (descending)`,
    type: ['asc', 'desc'],
    defaultValue: 'asc',
  },
  {
    name: '[iconAlignment]',
    description: `Controls whether to render the sorting icon before or after the text in the header`,
    type: ['start', 'end'],
    defaultValue: 'end',
  },
  {
    name: '[alignment]',
    description: `Controls the alignment of the text and icon in the header `,
    type: ['start', 'center', 'end'],
    defaultValue: 'start',
  },
];
