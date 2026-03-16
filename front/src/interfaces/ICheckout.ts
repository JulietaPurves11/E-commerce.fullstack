export type DeliveryMethod = "envio" | "retiro";

export interface CheckoutData {
  name: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  deliveryMethod: DeliveryMethod;
}