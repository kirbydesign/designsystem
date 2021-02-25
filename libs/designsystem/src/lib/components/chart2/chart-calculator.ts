import { Chart, ChartDataSets, ChartPoint } from 'chart.js';
import moment from 'moment';

export interface ChartTimeFormats {
  timeAxisFormat: string;
  tooltipFormat: string;
}

export class ChartCalculator {
  /**
   * Calculates nearest stepsize aproximately fitting the desired number of steps,
   * and clamped to nice values like 1, 5, 10, 50, 100 etc.
   * This makes the yAxis values nice round values (0, 100, 200, 300 etc.)
   * instead of eg. 121, 243 etc.
   *
   * @param stepSize max and min divided by wanted number of steps
   * (the last is an aproxomation - actual data will decide the number of steps)
   */
  public static getNiceStepSize(stepSize: number): number {
    let roundToNearest = 0.1;
    let count = 0;

    // Find next increment of 1, 5, 10, 50, 100 etc. to round to
    do {
      if (count) {
        roundToNearest *= count % 2 ? 5 : 2;
      }
      count++;
    } while (roundToNearest < stepSize);

    return Math.ceil(stepSize / roundToNearest) * roundToNearest;
  }

  /**
   * Calculates a nice looking upper and lower value and stepsize
   * @param min lower value in dataset
   * @param max upper value in dataset
   * @param numSteps the amount of segments to use - will decrease if it does not create a nice resolution (1, 5, 10, 50, 100 etc. steps)
   */

  public static getSteps(
    min: number,
    max: number,
    numSteps: number = 5
  ): { lower: number; upper: number; step: number } {
    const origMin: number = min;
    const origMax: number = max;
    // Increase resolution to account for very small numbers
    max *= 100;
    min *= 100;

    let stepSize: number = (max - min) / numSteps;

    stepSize = this.getNiceStepSize(stepSize);

    // Ajust min and max to nearest stepsize
    max = Math.ceil(max + (stepSize - (max % stepSize)));
    min = Math.floor((min - (min % stepSize)) * 100) / 100;

    // Decrease resolution to reset to real numbers
    max /= 100;
    min /= 100;
    stepSize /= 100;

    // Handle if points are on a flat line
    if (stepSize === 0) {
      stepSize = 0.1;
      min = origMin - 0.1;
      max = origMax + 0.1;
    }

    return {
      lower: min,
      upper: max,
      step: stepSize,
    };
  }

  /**
   * Search a dataset for minimum and maximum values and returns an object with these values.
   * @param dataSets
   */
  public static readMinMaxY(
    dataSets: ChartDataSets[]
  ): { min: number; minIndex: number; max: number; maxIndex: number } {
    let testVal: number;
    let min: number = null;
    let max: number = null;
    let minIndex: number = null;
    let maxIndex: number = null;
    for (let j = 0; j < dataSets.length; j++) {
      const data = dataSets[j].data;

      for (let i = 0; i < data.length; ++i) {
        testVal =
          typeof data[i] === 'number' ? (data[i] as number) : ((data[i] as ChartPoint).y as number);

        if (max === null || testVal >= max) {
          max = testVal;
          maxIndex = i;
        }

        if (min === null || testVal <= min) {
          min = testVal;
          minIndex = i;
        }
      }

      // Handle two points of same value

      if (typeof data[0] !== 'number' && data.length === 2 && data[0] === data[1]) {
        min = (data[0] as ChartPoint).y as number;
        max = (data[0] as ChartPoint).y as number;
        minIndex = 0;
        maxIndex = 1;
      }
    }
    return { min, minIndex, max, maxIndex };
  }

  /**
   * Returns dates as nicely formatted for the x axis
   *
   * @param data an array of chartpoints
   * @param format The moment dateformat to use
   */

  public static getLabelsAsDateTime(data: Chart.ChartPoint[], format: string): string[] {
    const labels: string[] = [];
    // Attach labels to the x axis
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < data.length; i++) {
      let date: string = moment(data[i].x).format(format);
      date = date.charAt(0).toUpperCase() + date.substr(1);
      labels.push(date);
    }
    return labels;
  }

  /**
   * Gets a dateformat (for Moment) based on the interval
   * @param fromTimestamp Periods lowest timestamp
   * @param toTimestamp Periods highest timestamp
   */
  public static getDateFormat(fromTimestamp: number, toTimestamp: number): ChartTimeFormats {
    const format: ChartTimeFormats = {
      timeAxisFormat: 'YYYY',
      tooltipFormat: "MMM 'YY",
    };

    const periodMilliseconds: number = toTimestamp - fromTimestamp;

    // If less than one and a half year
    if (periodMilliseconds < 47336400000) {
      format.timeAxisFormat = format.tooltipFormat = 'Do MMM';
    }

    // If less than three days
    if (periodMilliseconds < 259200000) {
      format.timeAxisFormat = format.tooltipFormat = 'LT';
    }

    // If less than three days

    return format;
  }
}
