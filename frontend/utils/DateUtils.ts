import {format, parse} from "date-fns";

export enum DATE_FORMAT {
  DATE,
  TIME,
  DATE_TIME
}

export class DateUtils {

  private static readonly DEFAULT_DATE_SEPARATOR = "/";
  private static readonly DEFAULT_TIME_SEPARATOR = ":";

  static formatBy(date: Date | number | string | undefined | string[], formatString: string): string {
    if (date instanceof Date && !isNaN(date.getDate())) {
      return format(date, formatString);
    }
    else if (date && !Array.isArray(date) && (typeof date === 'number' || (typeof date === 'string' && !isNaN(+date)))) {
      return format(new Date(date), formatString);
    }
    else if (date && !Array.isArray(date) && typeof date === 'string') {
      return format(Date.parse(date), formatString);
    }
    return '';
  }

  static format(date: Date | number | string | undefined | string[], dateFormat: DATE_FORMAT,
                dateSeparator: string = this.DEFAULT_DATE_SEPARATOR,
                timeSeparator: string = this.DEFAULT_TIME_SEPARATOR): string {
    if (date instanceof Date && !isNaN(date.getDate())) {
      return format(date, this.buildFormat(dateFormat, dateSeparator, timeSeparator));
    }
    else if (date && !Array.isArray(date) && (typeof date === 'number' || (typeof date === 'string' && !isNaN(+date)))) {
      return format(new Date(date), this.buildFormat(dateFormat, dateSeparator, timeSeparator));
    }
    else if (date && !Array.isArray(date) && typeof date === 'string') {
      return format(new Date(date), this.buildFormat(dateFormat, dateSeparator, timeSeparator));
    }
    return '';
  }

  private static buildFormat(format: DATE_FORMAT, dateSeparator: string, timeSeparator: string): string {
    switch (format) {
      case DATE_FORMAT.DATE:
        return this.buildDateFormat(dateSeparator);
      case DATE_FORMAT.TIME:
        return this.buildTimeFormat(timeSeparator);
      case DATE_FORMAT.DATE_TIME:
        return `${this.buildDateFormat(dateSeparator)} ${this.buildTimeFormat(timeSeparator)}`;
      default:
        return '';
    }
  }

  private static buildDateFormat(dateSeparator: string): string {
    return `dd${dateSeparator}MM${dateSeparator}yyyy`;
  }

  private static buildTimeFormat(timeSeparator: string): string {
    return `HH${timeSeparator}mm${timeSeparator}ss`;
  }

}
