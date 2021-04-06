import { FormatWidth, getLocaleDateFormat } from '@angular/common';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import IMask from 'imask';

interface Blocks {
  d: Block;
  m: Block;
  y: Block;
}

interface Block {
  mask: typeof IMask.MaskedRange;
  from: number;
  to: number;
  maxLength?: number;
  placeholderChar: string;
}

type DateFormat = keyof Blocks;
type DateFormatOrder = DateFormat[];

/*
 * This DateMask is based open example from IMask
 * https://imask.js.org/guide.html#masked-date
 */
@Injectable({ providedIn: 'root' })
export class DateMaskService {
  mask = Date;
  pattern: string;
  autofix: boolean = true;
  lazy: boolean = false;
  overwrite: boolean = true;
  separator = this.locale === 'da' ? '.' : '/';
  blocks: Blocks = {
    d: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 31,
      maxLength: 2,
      placeholderChar: 'd',
    },
    m: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
      maxLength: 2,
      placeholderChar: 'm',
    },
    y: {
      mask: IMask.MaskedRange,
      from: 1900,
      to: 9999,
      placeholderChar: this.locale === 'da' ? 'å' : 'y',
    },
  };
  format = this.formatDate;
  parse = this.parseDate;

  private localeDateFormat: string = getLocaleDateFormat(this.locale, FormatWidth.Short);
  private dateFormatOrder: DateFormatOrder = this.getDateFormatOrder(this.localeDateFormat);

  constructor(@Inject(LOCALE_ID) private locale: string) {
    this.pattern = this.getPattern(this.dateFormatOrder, this.separator);
  }

  // TODO: ADD TESTS
  formatDate(date: Date): string {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDate = {
      d: day < 10 ? '0' + day : day,
      m: month < 10 ? '0' + month : month,
      y: year,
    };

    return this.dateFormatOrder
      .map((format) => {
        return formattedDate[format];
      })
      .join(this.separator);
  }

  // TODO: ADD TESTS
  parseDate(str: string): Date {
    const yearMonthDay = str.split(this.separator);
    return new Date(
      parseInt(yearMonthDay[this.dateFormatOrder.indexOf('y')]),
      parseInt(yearMonthDay[this.dateFormatOrder.indexOf('m')]) - 1,
      parseInt(yearMonthDay[this.dateFormatOrder.indexOf('d')])
    );
  }

  private getPattern(dateFormatOrder: DateFormatOrder, separator: string) {
    return dateFormatOrder.join(separator + '`');
  }

  private getDateFormatOrder(localeDateFormat: string): DateFormatOrder {
    const dateFormats: DateFormatOrder = ['d', 'm', 'y'];
    return dateFormats.sort((a, b) => {
      return (
        localeDateFormat.toLocaleLowerCase().lastIndexOf(a) -
        localeDateFormat.toLocaleLowerCase().lastIndexOf(b)
      );
    });
  }
}
