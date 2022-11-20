export interface ICarVariant {
  id: string;
  color: string;
  imageUrl: string;
  carId: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}
