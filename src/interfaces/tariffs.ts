export interface ITariff {
  id: string;
  type: string;
  price: number;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}
