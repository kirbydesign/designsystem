export class DateFormats {
  static readonly SHORT_DATE_FORMAT = 'dd.MM.yyyy';
  static readonly MEDIUM_DATE_FORMAT = 'd. MMMM y';
  static readonly MEDIUM_LETTER_DATE_FORMAT = 'dd. MMM yyyy';
  static readonly SHORT_TIME_FORMAT = 'HH:mm';
  static readonly MEDIUM_TIME_FORMAT = 'HH:mm:ss';
  static readonly SHORT_DATE_MEDIUM_TIME_FORMAT = `${DateFormats.SHORT_DATE_FORMAT} ${DateFormats.MEDIUM_TIME_FORMAT}`;
}
