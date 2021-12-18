export class PriceUtils {

  static round(price: number): number {
    return Math.round((price + Number.EPSILON) * 100) / 100;
  }

}
