import { ColorHelper, DesignTokenHelper } from '@kirbydesign/designsystem/helpers';
import { ScatterDataPoint } from 'chart.js';
import { Context } from 'chartjs-plugin-datalabels/types/context';
import { Align, Options } from 'chartjs-plugin-datalabels/types/options';

const { getThemeColorHexString } = ColorHelper;
const { fontSize } = DesignTokenHelper;

export const getDataLabelPosition = (data: ScatterDataPoint[], dataIndex: number): Align | null => {
  const scatterPointDataYvalues: number[] = (data as ScatterDataPoint[]).map(
    (scatterDatapoint) => scatterDatapoint.y
  );

  const minValue = Math.min(...scatterPointDataYvalues);
  const minValueIndex = scatterPointDataYvalues.indexOf(minValue);

  if (dataIndex === minValueIndex) {
    return 'bottom';
  }

  const maxValue = Math.max(...scatterPointDataYvalues);
  const maxValueIndex = scatterPointDataYvalues.indexOf(maxValue);

  if (dataIndex === maxValueIndex) {
    return 'top';
  }

  return null;
};

export const dataLabelsPluginConfig: Partial<Options> = {
  backgroundColor: '#005c3c',
  color: getThemeColorHexString('white'),
  borderRadius: 3,
  font: {
    lineHeight: 1,
    size: parseInt(fontSize('xs')),
  },
  padding: {
    top: 6,
    left: 5,
    right: 5,
    bottom: 5,
  },
  offset: 5,
  align: (context: Context): Align =>
    getDataLabelPosition(context.dataset.data as ScatterDataPoint[], context.dataIndex),
  display: (context: Context): boolean => {
    return showDataLabel(context);
  },
  formatter: (dataPoint: ScatterDataPoint): string => dataPoint.y.toString(),
};

function showDataLabel(context: Context) {
  const data: ScatterDataPoint[] = [...context.dataset.data] as ScatterDataPoint[];
  const yValues = data.map((dataPoints) => dataPoints.y);

  const minValue = Math.min(...yValues);
  const minValueIndex = yValues.indexOf(minValue);

  const maxValue = Math.max(...yValues);
  const maxValueIndex = yValues.indexOf(maxValue);

  return context.dataIndex === maxValueIndex || context.dataIndex === minValueIndex;
}
