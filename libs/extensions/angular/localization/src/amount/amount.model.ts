export interface Amount {
  /**
   * The monetary value
   * @min -999999999
   * @max 999999999
   * @example [100]
   */
  amount: number;

  /**
   * The currency in which the value is denominated
   * @example [DKK]
   */
  currencyCode: string;
}
