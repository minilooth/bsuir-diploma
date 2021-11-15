import {format} from "date-fns";
import ruLocale from "date-fns/locale/ru";

export class DateUtils {

  public static readonly DEFAULT_DATE_FORMAT = 'yyyy-MM-dd';
  public static readonly DEFAULT_DATE_TIME_FORMAT = 'dd-MM-yyyy HH:mm:ss';
  private static readonly LOCALE = ruLocale;

  static format(date: Date, formatString?: string): string {
    return format(date, formatString ?? this.DEFAULT_DATE_FORMAT, {locale: this.LOCALE});
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
