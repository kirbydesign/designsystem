import { Injectable } from '@angular/core';

enum verticalAlignmentEnum {
  top = 'flex-start',
  center = 'center',
  bottom = 'flex-end'
}
enum horisontalAlignmentEnum {
  left = 'flex-start',
  center = 'center',
  right = 'flex-end'
}

export type horisontalAlignment = 'left' | 'center' | 'right';
export type verticalAlignment = 'top' | 'center' | 'bottom';

@Injectable({
  providedIn: 'root'
})
export class ListFormatService {
  private readonly defaultHorisontalAlignment: horisontalAlignment = 'left';
  private readonly defaultVerticalAlignment: verticalAlignment = 'center';
  private readonly defaultWidth = 1;

  constructor() {}

  getWidth(width: number): string {
    if (width && width > 0) {
      return `${width * 100}%`;
    }
    console.warn(
      `Invalid value ${width} for width. Valid values numbers > 0. Defaulting to ${
        this.defaultWidth
      }`
    );
    return `${this.defaultWidth * 100}%`;
  }

  getHorisontalAlignment(alignment: horisontalAlignment): string {
    if (alignment && horisontalAlignmentEnum[alignment]) {
      return horisontalAlignmentEnum[alignment];
    }
    console.warn(
      `Invalid value ${alignment} for horisontalAlignment. Valid values are 'left', 'center', 'right'. Defaulting to '${
        this.defaultHorisontalAlignment
      }'`
    );
    return horisontalAlignmentEnum[this.defaultHorisontalAlignment];
  }

  getVerticalAlignment(alignment: verticalAlignment): string {
    if (alignment && verticalAlignmentEnum[alignment]) {
      return verticalAlignmentEnum[alignment];
    }
    console.warn(
      `Invalid value ${alignment} for verticalAlignment. Valid values are 'top', 'center', 'bottom'. Defaulting to '${
        this.defaultVerticalAlignment
      }'`
    );
    return verticalAlignmentEnum[this.defaultVerticalAlignment];
  }
}
