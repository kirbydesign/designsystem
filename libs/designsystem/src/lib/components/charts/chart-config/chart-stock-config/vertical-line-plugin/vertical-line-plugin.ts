import { VerticalLinePlugin } from './vertical-line-plugin.model';

const verticalLineId = 'verticalLine';

export const getVerticalLinePluginConfig: VerticalLinePlugin = {
  id: verticalLineId,
  drawTime: 'beforeDraw',
  defaults: {
    width: 1,
    color: 'black',
  },
  afterInit: (chart) => {
    chart[verticalLineId] = {
      x: 0,
      y: 0,
    };
  },
  afterEvent: (chart, args) => {
    const { inChartArea } = args;
    const { x, y } = args.event;

    chart[verticalLineId] = { x, y, draw: inChartArea };
    chart.draw();
  },
  beforeDraw: (chart, _, options) => {
    const { ctx } = chart;
    const { top, bottom } = chart.chartArea;
    const { x, draw } = chart[verticalLineId];
    if (!draw) return;

    ctx.save();

    ctx.beginPath();
    ctx.lineWidth = options.width as number;
    ctx.strokeStyle = options.color as string;

    ctx.moveTo(x, bottom);
    ctx.lineTo(x, top);
    ctx.stroke();

    ctx.restore();
  },
};
