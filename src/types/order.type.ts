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
export interface TOrder {
  _id: string;
  clientId: string;
  deliveryAmount: string;
  points: Point[];
  weight: number;
  distance: number;
  clientPhone: string;
  clientPoint: Point;
  clientName: string;
  comment?: string;
  courierId: string;
  courierPhone?: string;
  status: OrderStatus;
  trackingId: string;
  sellerProducts: OrderSellerProduct[];
}

export interface OrderSellerProduct {
  seller: string;
  name: string;
  photoUri: string;
  products: OrderProduct[];
}

export interface OrderProduct {
  title: string;
  photoUri: string;
  selectedOption: number;
  weight: number;
  owner: string;
  quantity: number;
}
