export interface Booking {
  id: number;
  packageName: string;
  totalPrice: number;
  paidAmount: number;
  remaining: number;
  date: Date;
}
