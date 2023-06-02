import { ApiDescriptionProperty } from '../../shared/api-description/api-description-properties/api-description-properties.component';

export const dataTableApi: ApiDescriptionProperty[] = [
  {
    name: '[sortable]',
    description: `Enables / disables sorting on the th element. When true it will automatically render the arrow icon`,
    type: ['boolean'],
    defaultValue: 'false',
  },
  {
    name: '[sortDirection]',
    description: `Controls whether to show the up arrow (ascending) or down arrow (descending)`,
    type: ['asc', 'desc'],
    defaultValue: 'undefined',
  },
  {
    name: '[iconAlignment]',
    description: `Controls whether to render the icon to the left or right of the text in the header `,
    type: ['start', 'end'],
    defaultValue: 'end',
  },
  {
    name: '[textAlignment]',
    description: `Controls the alignment of the text and icon in the header `,
    type: ['start', 'center', 'end'],
    defaultValue: 'start',
  },
];
