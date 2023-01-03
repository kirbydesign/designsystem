import { ColorHelper } from '@kirbydesign/designsystem/helpers';
import { AnnotationTypeRegistry } from 'chartjs-plugin-annotation';

const { getThemeColorHexString } = ColorHelper;

/* The chart.js annotation does not allow for changing the 
defaults it comes with. In order to have sensible defaults 
this object is used instead and manually merged with the 
rest of the annotations object */
const borderColor = getThemeColorHexString('semi-dark');
const borderDash: [number, number] = [6, 3];
const borderWidth = 1;

export const CHART_ANNOTATIONS_CONFIG: Omit<AnnotationTypeRegistry, 'label' | 'polygon'> = {
  line: {
    borderDash,
    borderWidth,
    borderColor,
  },
  ellipse: {
    borderDash,
    borderWidth,
    borderColor,
    backgroundColor: 'transparent',
  },
  box: {
    borderDash,
    borderWidth,
    borderColor,
    backgroundColor: 'transparent',
  },
  point: {
    backgroundColor: 'initial',
  },
};
