import {format} from "date-fns";
import ruLocale from "date-fns/locale/ru";

export class DateUtils {

  private static readonly DEFAULT_FORMAT = 'yyyy-MM-dd';
  private static readonly LOCALE = ruLocale;

  static format(date: Date, formatString?: string): string {
    return format(date, formatString ?? this.DEFAULT_FORMAT, {locale: this.LOCALE});
  }

  static formatFromString(date: number | string | undefined | string[], formatString?: string): string {
    if (date && !Array.isArray(date)) {
      return this.format(new Date(date), formatString);
    }
    return '';
  }

  static formatFromNumber(date: number | string | undefined | string[], formatString?: string): string {
    return this.format(new Date(Number(date)), formatString);
  }

}
