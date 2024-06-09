export type Point = {
  latitude: number;
  longitude: number;
  city: string;
  address: string;
  apartment: string;
  floor: string;
  street: string;
};

export enum OrderStatus {
  AwaitingPayment = "AwaitingPayment",
  AwaitingCourier = "AwaitingCourier",
  CourierPickedUp = "CourierPickedUp",
  InTransit = "InTransit",
  Delivered = "Delivered",
  Cancelled = "Cancelled",
  UnderReview = "UnderReview",
}

export type TOrder = {
  _id: string;
  clientId: string;
  deliveryAmount: string;
  points: Point[];
  weight: number;
  distance: number;
  clientPhone: string;
  clientPoint: Point;
  comment: string;
  courierId: string;
  courierPhone: string;
  status: OrderStatus;
  trackingId: string;
};
