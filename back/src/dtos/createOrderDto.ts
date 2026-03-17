export type DeliveryMethod = "envio" | "retiro";

export interface CheckoutDto {
  name: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  deliveryMethod: DeliveryMethod;
}

export interface OrderProductDto {
  id: number;
  quantity: number;
}

export interface CreateOrderDto {
  userId: number;
  products: OrderProductDto[];
  checkout: CheckoutDto;
}